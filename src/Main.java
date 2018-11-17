import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        Main main = new Main();
        ArrayList<Snake> currentGeneration = new ArrayList<>();

        // make initial generation
        for (int i = 0; i < 10000; i++) {
            currentGeneration.add(new Snake(new Genome(), new Position(5,5)));
        }

        for (int generation = 0; generation < 50; generation++) {
            ArrayList<Genome> newGeneration = new ArrayList<>();
            for (int i = 0; i < currentGeneration.size(); i++) {
                int res = main.playGame(currentGeneration.get(i));
            }
        }
    }

    int playGame(Snake s) {
        Game g = new Game(s);
        return g.playGame();
    }
}
