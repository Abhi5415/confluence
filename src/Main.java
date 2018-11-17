import java.util.ArrayList;
import java.util.Collections;

public class Main implements Constants {
    public static void main(String[] args) {
        Main main = new Main();
        ArrayList<Snake> currentGeneration = new ArrayList<>();

        // make initial generation
        for (int i = 0; i < 1000; i++) {
            currentGeneration.add(new Snake(new Genome(), new Position(5,5)));
        }

        int gens = 500;
        for (int generation = 0; generation < gens; generation++) {

            for (int i = 0; i < currentGeneration.size(); i++) {
                currentGeneration.get(i).score = 0;
                main.playGame(currentGeneration.get(i));
            }

            Collections.sort(currentGeneration);

            ArrayList<Snake> newGeneration = new ArrayList<>();


            if (generation == gens - 1) {
                for (Snake snek : currentGeneration) {
                    System.out.println(snek);
                }
            } else {
                System.out.println("GENERATION: " + generation + " highest score " + currentGeneration.get(0).score + " size " + currentGeneration.size());
            }

            // Keep the top batch
            for (int i = 0; i < 150; i++) {
                Snake s = currentGeneration.get(i);
                newGeneration.add(s.clone());
            }

            // Randomize the top batch
            for (int i = 0; i < 300; i++) {
                Snake s = currentGeneration.get(i).clone();
                s.genome = new Genome(s.genome);
                newGeneration.add(s);
            }

            // Add Randoms
            for (int i = 0; i < 250; i++) {
                newGeneration.add(new Snake(new Genome(), new Position(5,5)));
            }

            Snake first = currentGeneration.get(0).clone();
            for (int i = 1; i < 401; i++) {
                Snake s = currentGeneration.get(i).clone();
                s.genome = new Genome(s.genome.clone(), first.genome.clone());
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
