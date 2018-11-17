import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        ArrayList<Snake> currentGeneration = new ArrayList<>();

        // make initial generation
        for (int i = 0; i < 10000; i++) {
            currentGeneration.add(new Snake(new Genome()));
        }

        for (int generation = 0; generation < 50; generation++) {
            System.out.println("Generation " + generation);

            ArrayList<Genome> newGeneration = new ArrayList<>();

            // play all mutations
            for (int i = 0; i < currentGeneration.size(); i += 2) {
                int res = playGame(currentGeneration.get(i), currentGeneration.get(i + 1));
                newGeneration.add(r.loser);
                newGeneration.add(r.winner);
            }

            Collections.sort(newGeneration);

            if (generation == 49) {
                for (int i = 0; i < 50; i++) {
                    System.out.println(newGeneration.get(i));
                }

//                Tron t = new Tron();
//                t.returnWinnerVerbose(newGeneration.get(0), newGeneration.get(1));
            }

            currentGeneration = new ArrayList<>();

            // Keep top 15%
            for (int i = 0; i < 1500; i++) {
                currentGeneration.add(newGeneration.get(i));
            }

            // breed two random indices of current generation
            for (int i = 1500; i < 8000; i++) {
                int random1 = random(0, 149);
                int random2 = random(0, 149);
                currentGeneration.add(new Genome(newGeneration.get(random1), newGeneration.get(random2)));
            }

            // top dog
            for (int i = 1; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(0), newGeneration.get(i)));
            }

            // second best
            for (int i = 2; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(1), newGeneration.get(i)));
            }

            // third best
            for (int i = 3; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(2), newGeneration.get(i)));
            }

            // forurth best
            for (int i = 4; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(4), newGeneration.get(i)));
            }

            // fifth boi
            for (int i = 6; i < 16; i++) {
                currentGeneration.add(new Genome(newGeneration.get(5), newGeneration.get(i)));
            }


            // introduce 25% random population
            for (int i = 7500; i < 10000; i++) {
                int random1 = random(0, 100);
                currentGeneration.add(new Genome(newGeneration.get(random1)));
            }
        }

        Snake s = new Snake();

        Game g = new Game(s);
        g.debug();
        g.play();
    }
}
