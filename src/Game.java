import java.util.Arrays;

public class Game {
    int[][] grid;
    Snake snake;

    public Game(Snake s) {
        grid = new int[15][15];
        snake = s;

        mark(s.position);
    }

    public void mark(Position p) {
        grid[p.y][p.x] = 's';
    }

    public void debug() {
        for (int i = 0; i < grid.length; i++) {
            System.out.println(Arrays.toString(grid[i]));
        }
    }
}
