import java.util.Arrays;

public class Game {
    char[][] grid;
    Snake snake;
    Position food;
    char previousDirection;

    public Game(Snake s) {
        grid = new char[17][17];
        previousDirection = 'd';
        snake = s;

        makeGrid();

        food = generateFood();

        mark(s.position, 's');
        mark(food, 'f');
    }

    public void play() {
        char c = snake.nextMove();
        Position newPosition = new Position(-1, -1);
        int x = snake.position.x;
        int y = snake.position.y;

        switch (previousDirection) {
            case 'u':
                if (c == 's')
                    newPosition = new Position(x, y - 1);
                else if (c == 'l') {
                    newPosition = new Position(x - 1, y);
                    previousDirection = 'l';
                } else if (c == 'r') {
                    newPosition = new Position(x + 1, y);
                    previousDirection = 'r';
                }
                break;
            case 'd':
                if (c == 's')
                    newPosition = new Position(x, y + 1);
                else if (c == 'l') {
                    newPosition = new Position(x + 1, y);
                    previousDirection = 'u';
                } else if (c == 'r') {
                    newPosition = new Position(x - 1, y);
                    previousDirection = 'd';
                }
                break;
            case 'r':
                if (c == 's')
                    newPosition = new Position(x + 1, y);
                else if (c == 'l') {
                    newPosition = new Position(x, y - 1);
                    previousDirection = 'u';
                } else if (c == 'r') {
                    newPosition = new Position(x, y + 1);
                    previousDirection = 'd';
                }
                break;
            case 'l':
                if (c == 's')
                    newPosition = new Position(x - 1, y);
                else if (c == 'l') {
                    newPosition = new Position(x, y + 1);
                    previousDirection = 'd';
                } else if (c == 'r') {
                    newPosition = new Position(x, y - 1);
                    previousDirection = 'u';
                }
                break;
        }

        if (!validate(newPosition)) {
            System.out.println("Invalid");
            return;
        } else {
            if (grid[newPosition.y][newPosition.x] == 'f') {
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
        return grid[p.y][p.x] == '.';
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
        grid[p.y][p.x] = c;
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
            grid[p.y][p.x] = 's';
        }
    }

    public void debug() {
        makeGrid();

        for (int i = 0; i < grid.length; i++) {
            System.out.println(Arrays.toString(grid[i]));
        }
    }
}
