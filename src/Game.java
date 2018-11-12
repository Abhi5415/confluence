import java.util.Arrays;

public class Game {
    char[][] grid;
    Snake snake;
    Position food;
    char absolutePreviousPosition;

    public Game(Snake s) {
        grid = new char[17][17];
        absolutePreviousPosition = 'd';
        snake = s;

        makeGrid();

        food = generateFood();

        mark(s.position, 's');
        mark(food, 'f');
    }

    public void play() {
        char c = snake.nextMove();
        Position newPosition = new Position(-1, -1);
        int row = snake.position.row;
        int col = snake.position.col;

        switch (absolutePreviousPosition) {
            case 'u':
                if (c == 's')
                    newPosition = new Position(row - 1, col);
                else if (c == 'l') {
                    newPosition = new Position(row, col - 1);
                    absolutePreviousPosition = 'l';
                } else if (c == 'r') {
                    newPosition = new Position(row, col + 1);
                    absolutePreviousPosition = 'r';
                }
                break;
            case 'd':
                if (c == 's')
                    newPosition = new Position(row + 1, col);
                else if (c == 'l') {
                    newPosition = new Position(row, col + 1);
                    absolutePreviousPosition = 'u';
                } else if (c == 'r') {
                    newPosition = new Position(row, col - 1);
                    absolutePreviousPosition = 'd';
                }
                break;
            case 'r':
                if (c == 's')
                    newPosition = new Position(row, col + 1);
                else if (c == 'l') {
                    newPosition = new Position(row - 1, col);
                    absolutePreviousPosition = 'u';
                } else if (c == 'r') {
                    newPosition = new Position(row + 1, col);
                    absolutePreviousPosition = 'd';
                }
                break;
            case 'l':
                if (c == 's')
                    newPosition = new Position(row, col - 1);
                else if (c == 'l') {
                    newPosition = new Position(row + 1, col);
                    absolutePreviousPosition = 'd';
                } else if (c == 'r') {
                    newPosition = new Position(row - 1, col);
                    absolutePreviousPosition = 'u';
                }
                break;
        }

        if (!validate(newPosition)) {
            System.out.println("Invalid");
            return;
        } else {
            if (grid[newPosition.row][newPosition.col] == 'f') {
                snake.pushPosition(newPosition, false);
            } else {
                System.out.println();
                snake.position = newPosition;
                snake.pushPosition(newPosition, true);
            }
            mark(newPosition, 's');
        }

        debug();

    }

    public boolean validate(Position p) {
        return grid[p.row][p.col] == '.';
    }

    public Position generateFood() {
        int x = random(1, 16);
        int y = random(1, 16);

        while (grid[y][x] != '.') {
            x = random(1, 15);
            y = random(1, 15);
        }

        return new Position(x, y);
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
    }

    public void debug() {
        makeGrid();

        for (int i = 0; i < grid.length; i++) {
            System.out.println(Arrays.toString(grid[i]));
        }
    }
}
