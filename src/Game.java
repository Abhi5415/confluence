import java.util.Arrays;

public class Game {
    char[][] grid;
    Snake snake;
    Position food;
    char previousDirection;

    public Game(Snake s) {
        grid = new char[17][17];
        previousDirection = 'd';

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

        snake = s;
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
                    newPosition = new Position(y - 1, x);
                else if (c == 'l')
                    newPosition = new Position(y, x - 1);
                else if (c == 'r')
                    newPosition = new Position(y, x + 1);
                break;
            case 'd':
                if (c == 's')
                    newPosition = new Position(y + 1, x);
                else if (c == 'l')
                    newPosition = new Position(y, x + 1);
                else if (c == 'r')
                    newPosition = new Position(y, x - 1);
                break;
            case 'r':
                if (c == 's')
                    newPosition = new Position(y, x + 1);
                else if (c == 'l')
                    newPosition = new Position(y - 1, x);
                else if (c == 'r')
                    newPosition = new Position(y + 1, x);
                break;
            case 'l':
                if (c == 's')
                    newPosition = new Position(y, x - 1);
                else if (c == 'l')
                    newPosition = new Position(y + 1, x);
                else if (c == 'r')
                    newPosition = new Position(y - 1, x);
                break;
        }


        if (!validate(newPosition)) {
            System.out.println("Invalid");
        } else {
            System.out.println();
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

        while (grid[y][x] == 'f') {
            x = random(1, 16);
            y = random(1, 16);
        }

        return new Position(x, y);
    }

    public int random(int low, int high) {
        return (int) (Math.random() * (high - low + 1)) + low;
    }

    public void mark(Position p, char c) {
        grid[p.y][p.x] = c;
    }

    public void debug() {
        for (int i = 0; i < grid.length; i++) {
            System.out.println(Arrays.toString(grid[i]));
        }
    }
}
