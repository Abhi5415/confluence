public class Genome implements Constants{
    double wallDistance;
    double foodPositionX[];
    double foodPositionY[];
    double freeSpace;
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

    public void makeChild(int a, double child[], double array1[], double array2[]){
        for (int i = 0; i < a; i++){
            child[i] = random(array1[i], array2[i]);
        }
    }

    public void randomizeSuccess(int a, double child[], double parent[] , double upper, double lower){
        for (int i = 0; i < a; i++){
            child[i] = parent[i]* random(lower, upper);
        }
    }

    //------------------- constructors ----------------------
    // - Random Intializer

    public Genome() {
        // ------ constant for game -----
        this.currentDirection = ' ';

        foodPositionX = new double[3];
        foodPositionY = new double[3];

        // ------ initializing genome population ------
        this.wallDistance = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        this.freeSpace = random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
        intitializeArray(3, this.foodPositionX);
        intitializeArray(3, this.foodPositionY);
    }

    // -
    public Genome(Genome g1, Genome g2) {
        // ------ constant for game -----
        this.currentDirection = ' ';

        // ------ initializing genome population ------
        this.wallDistance = random(g1.wallDistance, g2.wallDistance);
        this.freeSpace = random(g1.freeSpace , g2.freeSpace);
        makeChild(3, this.foodPositionX, g1.foodPositionX, g2.foodPositionX);
        makeChild(3, this.foodPositionY, g1.foodPositionY, g2.foodPositionY);
//        makeChild(11, this.vision, g1.vision, g2.vision);
//        makeChild(11, this.foodVision, g1.foodVision, g2.foodVision);
    }

    public Genome(Genome g){
        // ------ constant for game -----
        this.currentDirection = ' ';

        // ------ initializing genome population ------
        this.wallDistance = g.wallDistance * random(RANDOM_MULTIPLIER_LOWER, RANDOM_MULTIPLIER_UPPER);
        this.freeSpace = g.wallDistance * random(RANDOM_MULTIPLIER_LOWER, RANDOM_MULTIPLIER_UPPER);
        randomizeSuccess(3, this.foodPositionX, g.foodPositionX, RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
        randomizeSuccess(3, this.foodPositionY, g.foodPositionY, RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
//        randomizeSuccess(11, this.vision, g.vision, RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
//        randomizeSuccess(11, this.foodVision, g.foodVision, RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
    }



}
