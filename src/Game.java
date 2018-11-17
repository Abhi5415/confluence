public class Game implements Constants {
    char[][] grid;
    Snake snake;
    Position food;
    char absolutePreviousPosition;
    int score;
    int moves;

    public Game(Snake s) {
        grid = new char[17][17];
        absolutePreviousPosition = 'd';
        snake = s;
        moves = 0;
        score = 0;

        makeGrid();

        mark(s.position, 's');
    }

    public void playGame() {
        while(play());
        snake.score = score;
    }


    public boolean play() {
        char c = snake.nextMove(grid, snake.position, food, absolutePreviousPosition);
//        System.out.println(c);
        Position newPosition = new Position(-1, -1);
        int row = snake.position.row;
        int col = snake.position.col;

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
                snake.pushPosition(newPosition, false);
                score++;
                resetFood();
            } else {
                snake.pushPosition(newPosition, true);
            }
            snake.position = newPosition;
            mark(newPosition, 's');
        }
        debug();

        return true;
    }

    public void resetFood() {
        food = generateFood();
    }

    public boolean validate(Position p) {
        char c = grid[p.row][p.col];

        return c == '.' || c == 'f';
    }

    public Position generateFood() {
        int row = random(2, 2);
        int col = random(1, 1);

        while (grid[row][col] != '.') {
            row = random(1, 15);
            col = random(1, 15);
        }

        return new Position(row, col);
    }

    public int random(int low, int high) {
        return (int) (Math.random() * (high - low + 1)) + low;
    }

    public void mark(Position p, char c) {
        grid[p.row][p.col] = c;
    }

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

        for (Position p : snake.snake) {
            grid[p.row][p.col] = 's';
        }

        if (food == null) {
            resetFood();
        }

        grid[food.row][food.col] = 'f';
    }

    public void debug() {
        makeGrid();

//        for (int i = 0; i < grid.length; i++) {
//            System.out.println(Arrays.toString(grid[i]));
//        }
    }
}
