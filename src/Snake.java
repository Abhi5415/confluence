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
}