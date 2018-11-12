import java.util.ArrayDeque;
import java.util.Queue;

public class Snake {
    Queue<Position> snake;
    Position position;

    public Snake() {
        snake = new ArrayDeque<>();
        position = new Position(1,1);
    }

    public void pushPosition(Position p) {
        snake.add(p);
    }


}
