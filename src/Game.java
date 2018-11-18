import java.util.Arrays;
import java.util.Random;


public class Game implements Constants {
    char[][] grid;
    Genome g;
    Position food;
    char absolutePreviousPosition;
    int score;
    int moves;
    Random generator;

    public Game(Genome g) {
        grid = new char[17][17];
        absolutePreviousPosition = 'd';
        moves = 0;
        score = 0;
        generator = new Random(1);
        this.g = g;
        mark(g.position, 's');
        makeGrid();
    }


    public void playGame() {
        g.position = new Position(5,5);
        while(play());
//        System.out.println(snake.position);
//        System.out.println(score);
        g.score = score;
    }

    public boolean play() {
        char c = g.nextMove(grid, g.position, food, absolutePreviousPosition);
//        System.out.println(c);
        Position newPosition = new Position(-1, -1);
        int row = g.position.row;
        int col = g.position.col;

        switch (absolutePreviousPosition) {
            case 'u':
                if (c == 's') {
                    newPosition = new Position(row - 1, col);
                    absolutePreviousPosition = 'u';
                } else if (c == 'l') {
                    newPosition = new Position(row, col - 1);
                    absolutePreviousPosition = 'l';
                } else if (c == 'r') {
                    newPosition = new Position(row, col + 1);
                    absolutePreviousPosition = 'r';
                }
                break;
            case 'd':
                if (c == 's') {
                    newPosition = new Position(row + 1, col);
                    absolutePreviousPosition = 'd';
                } else if (c == 'l') {
                    newPosition = new Position(row, col + 1);
                    absolutePreviousPosition = 'r';
                } else if (c == 'r') {
                    newPosition = new Position(row, col - 1);
                    absolutePreviousPosition = 'l';
                }
                break;
            case 'r':
                if (c == 's') {
                    newPosition = new Position(row, col + 1);
                    absolutePreviousPosition = 'r';
                } else if (c == 'l') {
                    newPosition = new Position(row - 1, col);
                    absolutePreviousPosition = 'u';
                } else if (c == 'r') {
                    newPosition = new Position(row + 1, col);
                    absolutePreviousPosition = 'd';
                }
                break;
            case 'l':
                if (c == 's') {
                    newPosition = new Position(row, col - 1);
                    absolutePreviousPosition = 'l';
                } else if (c == 'l') {
                    newPosition = new Position(row + 1, col);
                    absolutePreviousPosition = 'd';
                } else if (c == 'r') {
                    newPosition = new Position(row - 1, col);
                    absolutePreviousPosition = 'u';
                }
                break;
        }

        if (!validate(newPosition)) {
//            System.out.println("Invalid move");
            return false;
        } else {
            moves++;
            if (moves >= MAX_MOVES) return false;
            if (grid[newPosition.row][newPosition.col] == 'f') {
                g.pushPosition(newPosition, false);
                score++;
                resetFood();
            } else {
                g.pushPosition(newPosition, true);
            }
            g.position = newPosition;
            mark(newPosition, 's');
        }
        debug();
//        print();

        return true;
    }


    // marks the passed position with the passed character
    public void mark(Position p, char c) {
        grid[p.row][p.col] = c;
    }

    // Generates a game board for the snake at any given time
    public void makeGrid() {
        for (int i = 0; i < grid.length; i++) {
            grid[0][i] = 'w';
            grid[i][0] = 'w';
            grid[16][i] = 'w';
            grid[i][16] = 'w';
        }

        for (int i = 1; i < grid.length - 1; i++) {
            for (int j = 1; j < grid.length - 1; j++) {
                grid[i][j] = '.';
            }
        }

//        System.out.println(g);
        for (Position p : g.snake) {
            grid[p.row][p.col] = 's';
        }

        if (food == null) {
            resetFood();
        }

        grid[food.row][food.col] = 'f';
    }

    // generates the next food
    public void resetFood() {
        food = generateFood();
    }

    public Position generateFood() {
        int row = 5;
        int col = 5;

        while (grid[row][col] != '.') {
            row = generator.nextInt(15);
            col = generator.nextInt(15);
        }
//        System.out.println("Generated Food at: " + row + ", " + col);
        return new Position(row, col);
    }

    // ensures that the next move is valid
    public boolean validate(Position p) {
        char c = grid[p.row][p.col];
        return c == '.' || c == 'f';
    }



    // ---- dev tools ----
    // print the current game board
    void print() {
        for (int i = 0; i  < grid.length; i++) {
            System.out.println(Arrays.toString(grid[i]));
        }
    }

    public void debug() {
        makeGrid();

//        for (int i = 0; i < grid.length; i++) {
//            System.out.println(Arrays.toString(grid[i]));
//        }
    }

}
