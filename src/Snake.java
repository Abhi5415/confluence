import java.util.ArrayDeque;
import java.util.Queue;

public class Snake {
    Queue<Position> snake;
    Position position;
    Genome genome;

    public Snake(Genome g, Position p) {
        snake = new ArrayDeque<>();
        position = p;
        genome = g;
        pushPosition(position, true);
    }

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

        switch (currentDirection) {
            case 'u':
                moveL = 'l';
                moveR = 'r';
                posS = new Position(p.row - 1, p.col);
                posL = new Position(p.row, p.col - 1);
                posR = new Position(p.row, p.col + 1);
                break;
            case 'd':
                moveL = 'r';
                moveR = 'l';
                posS = new Position(p.row + 1, p.col);
                posL = new Position(p.row, p.col + 1);
                posR = new Position(p.row, p.col - 1);
                break;
            case 'r':
                moveL = 'u';
                moveR = 'd';
                posS = new Position(p.row, p.col + 1);
                posL = new Position(p.row - 1, p.col);
                posR = new Position(p.row + 1, p.col);
                break;
            case 'l':
                moveL = 'd';
                moveR = 'u';
                posS = new Position(p.row, p.col - 1);
                posL = new Position(p.row + 1, p.col);
                posR = new Position(p.row - 1, p.col);
                break;
        }

//        double foodPositionX[];
//        double foodPositionY[];
//        double vision[]; //has 11 checks at various indecies near the snake (for its body)
//        double foodVision[]; //same 11 check food near the snake (for the food)
//        char currentDirection;


        ratingS += distanceToNearestObstacle(grid, p, currentDirection) * genome.wallDistance;
        ratingL += distanceToNearestObstacle(grid, p, moveL) * genome.wallDistance;
        ratingR += distanceToNearestObstacle(grid, p, moveR) * genome.wallDistance;

        ratingS += freeSpacesAtIndex(grid, posS) * genome.freeSpace;
        ratingL += freeSpacesAtIndex(grid, posL) * genome.freeSpace;
        ratingR += freeSpacesAtIndex(grid, posR) * genome.freeSpace;

        ratingS += relativeX(posS, food) * genome.foodPositionX[0];
        ratingL += relativeX(posL, food) * genome.foodPositionX[1];
        ratingR += relativeX(posR, food) * genome.foodPositionX[2];

        ratingS += relativeY(posS, food) * genome.foodPositionY[0];
        ratingL += relativeY(posL, food) * genome.foodPositionY[1];
        ratingR += relativeY(posR, food) * genome.foodPositionY[2];

        if (!isValidMove(posS, grid))
            ratingS -= 200;
        if (!isValidMove(posL, grid))
            ratingL -= 200;
        if (!isValidMove(posR, grid))
            ratingR -= 200;

        if (ratingS >= ratingL && ratingS >= ratingR) {
            return 's';
        } else if (ratingL >= ratingS && ratingL >= ratingR) {
            return 'l';
        }

        return 'r';
    }

    // Looks for valid moves from the grid
    public boolean isValidMove(Position p, char[][] grid) {
        int r = p.row;
        int c = p.col;
        if (!(r >= 1 && r <= 15 && c >= 1 && c <= 1))
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

    /*
     * Calculates relative y position with respect to b1. Assumes the move is valid.
     */
    public int relativeY(Position p, Position food) {
        return food.row - p.row;
    }

}

