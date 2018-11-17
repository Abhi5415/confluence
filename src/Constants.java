public interface Constants {
        int NUMBER_OF_GENERATIONS = 3 ;
        int NUMBER_OF_GENOMES = 10;

        double TOP_SPECIES = 0.15;
        double RANDOM_MULTIPLIER = 0.3;
        double RANDOM_POPULATION =  0.2;
        double BREED_TOP = 0.35;
        int RANKS = 15;

        // Genome config
        double RANDOM_LOWER_BOUND = -10;
        double RANDOM_UPPER_BOUND = 10;

        //Penalty For Invalid Move
        double PENALTY = -500;

    //    Random Multiplier

        double RANDOM_MULTIPLIER_UPPER = 1.3;
        double RANDOM_MULTIPLIER_LOWER = 0.7;

        double MAX_MOVES = 500;
}
