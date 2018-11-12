import java.util.ArrayDeque;
import java.util.Queue;

public class Snake {
    Queue<Position> snake;
    Position position;

    public Snake() {
        snake = new ArrayDeque<>();
        position = new Position(1,1);
        pushPosition(position, true);
    }

    public void pushPosition(Position p, boolean deleteTail) {
        if (deleteTail) {
            snake.poll();
        }

        snake.add(p);
    }

    public char nextMove() {
        return 's';
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
    

}

