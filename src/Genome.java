import java.util.ArrayDeque;
import java.util.Queue;

public class Genome implements Constants, Comparable{
    double wallDistance;
    double foodPositionX[];
    double foodPositionY[];
    double freeSpace;
    char currentDirection;

    Queue<Position> snake;
    Position position;
    int score;

    //------------------- tools ----------------------
    // gets a random value between two numbers
    public double random(double low, double high) {
        if (low > high) {
            double t = low;
            low = high;
            high = t;
        }
        return Math.random() * (high - low + 1) + low;
    }

    // Assigns random values to an array of length a (within bounds).
    public void intitializeArray(int a, double array[]){
        for (int i = 0; i < a; i++){
            array[i] = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        }
    }

    // Takes in two arrays and assigns random values between the parents to the child
    public void makeChild(int a, double child[], double array1[], double array2[]){
        for (int i = 0; i < a; i++){
            child[i] = random(array1[i], array2[i]);
        }
    }

    public void randomizeSuccess(int a, double child[], double parent[] , double upper, double lower){
        for (int i = 0; i < a; i++){
            child[i] = parent[i]* random(lower, upper);
        }
    }

    //------------------- constructors ----------------------
    // - Random Intializer

    public Genome(Position p) {
        // ------ snake variables -----
        snake = new ArrayDeque<>();
        position = p;
        pushPosition(position, true);

        // ------ constant for game -----
        this.currentDirection = ' ';

        // ------ initializing genome population ------
        this.wallDistance = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        this.freeSpace = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        this.foodPositionX = new double[3];
        this.foodPositionY = new double[3];
        intitializeArray(3, this.foodPositionX);
        intitializeArray(3, this.foodPositionY);
    }


    public Genome(Genome g1, Genome g2, Position p) {
        // ------ snake variables -----
        snake = new ArrayDeque<>();
        position = p;
        pushPosition(position, true);

        // ------ constant for game -----
        this.currentDirection = ' ';

        // ------ initializing genome population ------
        this.wallDistance = random(g1.wallDistance, g2.wallDistance);
        this.freeSpace = random(g1.freeSpace , g2.freeSpace);
        this.foodPositionX = new double[3];
        this.foodPositionY = new double[3];
        makeChild(3, this.foodPositionX, g1.foodPositionX, g2.foodPositionX);
        makeChild(3, this.foodPositionY, g1.foodPositionY, g2.foodPositionY);
    }


    public Genome(Genome g, Position p){
        // ------ snake variables -----
        snake = new ArrayDeque<>();
        position = p;
        pushPosition(position, true);

        // ------ constant for game -----
        this.currentDirection = ' ';

        // ------ initializing genome population ------
        this.wallDistance = g.wallDistance * random(RANDOM_MULTIPLIER_LOWER, RANDOM_MULTIPLIER_UPPER);
        this.freeSpace = g.wallDistance * random(RANDOM_MULTIPLIER_LOWER, RANDOM_MULTIPLIER_UPPER);
        this.foodPositionX = new double[3];
        this.foodPositionY = new double[3];
        randomizeSuccess(3, this.foodPositionX, g.foodPositionX, RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
        randomizeSuccess(3, this.foodPositionY, g.foodPositionY, RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
    }


    //------------------- snake mechanics ----------------------
    public void pushPosition(Position p, boolean deleteTail) {
        if (deleteTail) {
            snake.poll();
        }

        snake.add(p);
    }

    public char nextMove(char[][] grid, Position p, Position food, char currentDirection) {
        double ratingS = 0;
        double ratingL = 0;
        double ratingR = 0;

        char moveL = 's';
        char moveR = 's';
        Position posS = new Position(0, 0);
        Position posL = new Position(0, 0);
        Position posR = new Position(0, 0);


        ratingS += distanceToNearestObstacle(grid, p, currentDirection) * wallDistance;
        ratingL += distanceToNearestObstacle(grid, p, moveL) * wallDistance;
        ratingR += distanceToNearestObstacle(grid, p, moveR) * wallDistance;

        ratingS += freeSpacesAtIndex(grid, posS) * freeSpace;
        ratingL += freeSpacesAtIndex(grid, posL) * freeSpace;
        ratingR += freeSpacesAtIndex(grid, posR) * freeSpace;

        ratingS += relativeX(posS, food) * foodPositionX[0];
        ratingL += relativeX(posL, food) * foodPositionX[1];
        ratingR += relativeX(posR, food) * foodPositionX[2];

        ratingS += relativeY(posS, food) * foodPositionY[0];
        ratingL += relativeY(posL, food) * foodPositionY[1];
        ratingR += relativeY(posR, food) * foodPositionY[2];

        if (!isValidMove(posS, grid))
            ratingS -= 100;
        if (!isValidMove(posL, grid))
            ratingL -= 100;
        if (!isValidMove(posR, grid))
            ratingR -= 100;

        if (ratingS >= ratingL && ratingS >= ratingR) {
            return 's';
        } else if (ratingL >= ratingS && ratingL >= ratingR) {
            return 'l';
        }
        return 'r';
    }

    //------------------- next move helpers ----------------------
    // Looks for valid moves from the grid
    public boolean isValidMove(Position p, char[][] grid) {
        int r = p.row;
        int c = p.col;
        if (!(r >= 1 && r <= 15 && c >= 1 && c <= 15))
            return false;
        return grid[r][c] == '.';
    }

    // Looks for the distance to the nearest obstacle in the given direction
    public int distanceToNearestObstacle(char[][] grid, Position p, char direction) {
        switch (direction) {
            case 'u':
                for (int i = p.row - 1; i >= 0; i--) {
                    if (grid[i][p.col] != '.') {
                        return Math.abs(p.row - i - 1);
                    }
                }
            case 'd':
                for (int i = p.row + 1; i < grid.length; i++) {
                    if (grid[i][p.col] != '.') {
                        return Math.abs(i - p.row - 1);
                    }
                }
            case 'l':
                for (int i = p.col - 1; i >= 0; i--) {
                    if (grid[p.row][i] != '.') {
                        return Math.abs(p.col - i - 1);
                    }
                }
            case 'r':
                for (int i = p.col + 1; i < grid[0].length; i++) {
                    if (grid[p.row][i] != '.') {
                        return Math.abs(i - p.col - 1);
                    }
                }
            default:
                return -1;
        }
    }

    // Looks for freespaces at the proposed move
    public int freeSpacesAtIndex(char[][] grid, Position p) {
        int x = p.row;
        int y = p.col;

        int res = 0;

        for (int r = x - 2; r < x + 3; r++) {
            for (int c = y - 2; c < y + 3; c++) {
                // validate bounds
                if (r < 0 || r >= grid.length || c < 0 || c >= grid.length)
                    continue;

                if (grid[r][c] == '.')
                    res++;
            }
        }

        return res;
    }

    public int relativeX(Position p, Position food) {
        return food.col - p.col;
    }


    public int relativeY(Position p, Position food) {
        return food.row - p.row;
    }

    @Override
    public int compareTo(Object o) {
        Genome compare = (Genome) o;
        if (compare.score > score) return 1;
        else if (compare.score < score) return -1;
        return 0;
    }

    @Override
    public String toString() {
        return "Genome{" +
                "wallDistance=" + wallDistance +
                ", freeSpace=" + freeSpace +
                ", position=" + position +
                ", score=" + score +
                '}';
    }
}
