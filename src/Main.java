import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Main implements Constants {
    public static void main(String[] args) {
        ArrayList<Genome> currentGeneration = new ArrayList<>();
        int population = 0;

        // make initial generation
        for (int i = 0; i < NUMBER_OF_GENOMES; i++) {
            currentGeneration.add(new Genome(new Position()));
        }


        for (int generation = 0; generation < NUMBER_OF_GENERATIONS; generation++) {
            ArrayList<Genome> newGeneration = new ArrayList<>();

            for (int i = 0; i < currentGeneration.size(); i++) {
                currentGeneration.get(i).score = 0;
                Game game = new Game(currentGeneration.get(i));
                game.playGame();
            }

            Collections.sort(currentGeneration);

            System.out.println("Generation " + generation + " score " + currentGeneration.get(0).score);
            System.out.println("Top Scorer " + currentGeneration.get(0).toString());


            // Keep the top batch
            for (int i = 0; i < NUMBER_OF_GENOMES*(TOP_SPECIES); i++) {
                Genome g = currentGeneration.get(i);
                newGeneration.add(g);
            }
//            System.out.println("Step 1: "+ newGeneration.size());


            // Randomize the top batch
            for (int i = 0; i < NUMBER_OF_GENOMES*(RANDOM_MULTIPLIER); i++) {
                Genome g = currentGeneration.get(i);
                g = new Genome(g, new Position());
                newGeneration.add(g);
            }
//            System.out.println("Step 2: "+ newGeneration.size());


            // Add Randoms
            for (int i = 0; i < NUMBER_OF_GENOMES*(RANDOM_POPULATION); i++) {
                newGeneration.add(new Genome(new Position()));
            }
//            System.out.println("Step 3: "+ newGeneration.size());


            // Breed tops
            for (int i = 0; i < RANKS; i++) {
                for (int j = 0; j < (NUMBER_OF_GENOMES*(BREED_TOP))/RANKS; j++) {
                    Genome parent1 = currentGeneration.get(i);
                    Genome parent2 = currentGeneration.get(j);
                    Genome g = new Genome(parent1, parent2, new Position());
                    newGeneration.add(g);
                }
            }
//            System.out.println("Step 4: "+ newGeneration.size());
            currentGeneration = newGeneration;


        }
    }

}
