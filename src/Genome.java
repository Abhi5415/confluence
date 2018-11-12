public class Genome implements Constants{
    double wallDistance;
    double foodPositionX[];
    double foodPositionY[];
    double freeSpace;
    double vision[]; //has 11 checks at various indecies near the snake (for its body)
    double foodVision[]; //same 11 check food near the snake (for the food)
    char currentDirection;

    //------------------- tools ----------------------

    public double random(double low, double high) {
        if (low > high) {
            double t = low;
            low = high;
            high = t;
        }
        return Math.random() * (high - low + 1) + low;
    }

    public void intitializeArray(int a, double array[]){
        for (int i = 0; i < a; i++){
            array[i] = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        }
    }

    //------------------- constructors ----------------------

    public Genome() {
        // ------ constant for game -----
        this.currentDirection = ' ';

        // ------ initializing genome population ------
        this.wallDistance = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        this.freeSpace = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        intitializeArray(3, this.foodPositionX);
        intitializeArray(3, this.foodPositionY);
        intitializeArray(11, this.vision);
        intitializeArray(11, this.foodVision);
    }

}
