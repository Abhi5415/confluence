import java.util.ArrayList;
import java.util.Collections;

public class Main implements Constants {
    public static void main(String[] args) {
        Main main = new Main();
        ArrayList<Snake> currentGeneration = new ArrayList<>();

        // make initial generation
        for (int i = 0; i < 100; i++) {
            currentGeneration.add(new Snake(new Genome(), new Position(5,5)));
        }

        int gens = 500;
        for (int generation = 0; generation < gens; generation++) {

            for (int i = 0; i < currentGeneration.size(); i++) {
                currentGeneration.get(i).score = 0;
                main.playGame(currentGeneration.get(i));
            }
//            if (generation == 1) {
//                System.out.println("GENERATION 2");
//                for (Snake snek : currentGeneration) {
//                    System.out.println(snek);
//                }
//            }


            Collections.sort(currentGeneration);
            ArrayList<Snake> newGeneration = new ArrayList<>();


            if (generation == gens - 1) {
                for (Snake snek : currentGeneration) {
                    System.out.println(snek);
                }
            } else {
                System.out.println("GENERATION: " + generation);
            }

            // Keep the top batch
            for (int i = 0; i < 15; i++) {
                Snake s = currentGeneration.get(i);
                if (generation == 0)
                newGeneration.add(s.clone());
            }

            // Randomize the top batch
            for (int i = 0; i < 30; i++) {
                Snake s = currentGeneration.get(i).clone();
                s.genome = new Genome(s.genome);
                newGeneration.add(s);
            }

            // Add Randoms
            for (int i = 0; i < 25; i++) {
                newGeneration.add(new Snake(new Genome(), new Position(5,5)));
            }

            Snake first = currentGeneration.get(0).clone();
            for (int i = 1; i < 41; i++) {
                Snake s = currentGeneration.get(i).clone();
                s.genome = new Genome(s.genome, first.genome);
                newGeneration.add(s);
            }

            currentGeneration = newGeneration;
        }
    }

    void playGame(Snake s) {
//        System.out.println("NEW GAME");
        Game g = new Game(s);
        g.playGame();
    }
}
