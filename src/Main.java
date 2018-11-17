import java.util.ArrayList;
import java.util.Collections;

public class Main implements Constants {
    public static void main(String[] args) {
        Main main = new Main();
        ArrayList<Snake> currentGeneration = new ArrayList<>();

        // make initial generation
        for (int i = 0; i < NUMBER_OF_GENOMES; i++) {
            currentGeneration.add(new Snake(new Genome(), new Position(5,5)));
        }

        ArrayList<Snake> newGeneration = new ArrayList<>();

        for (int generation = 0; generation < NUMBER_OF_GENERATIONS; generation++) {
            for (int i = 0; i < NUMBER_OF_GENOMES; i++) {
                currentGeneration.get(i).score = 0;
                main.playGame(currentGeneration.get(i));
            }

            Collections.sort(currentGeneration);


            // Keep the top batch
            for (int i = 0; i < NUMBER_OF_GENOMES*(TOP_SPECIES); i++) {
                Snake s = currentGeneration.get(i);
                newGeneration.add(s);
            }

            // Randomize the top batch
            for (int i = 0; i < NUMBER_OF_GENOMES*(RANDOM_MULTIPLIER); i++) {
                Snake s = currentGeneration.get(i);
                s.genome = new Genome(s.genome);
                newGeneration.add(s);
            }

            // Add Randoms
            for (int i = 0; i < NUMBER_OF_GENOMES*(RANDOM_POPULATION); i++) {
                newGeneration.add(new Snake(new Genome(), new Position(5,5)));
            }

            for (int i = 0; i < RANKS; i++) {

                for (int j = i+1; j < NUMBER_OF_GENOMES*(BREED_TOP)/RANKS; j++) {
                    newGeneration.add(new Snake(new Genome(currentGeneration.get(i).genome, currentGeneration.get(j).genome) ,new Position(5,5)));
                }
            }

            Snake first = currentGeneration.get(0);
            for (int i = 1; i < NUMBER_OF_GENOMES; i++) {
                Snake s = currentGeneration.get(i);
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
