

public class Genome {
    double wallDistance;
    double foodPositionX[];
    double foodPositionY[];
    double freeSpace[];
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

    //------------------- constructors ----------------------

    public Genome() {
        this.wallDistance = wallDistance;
        this.foodPositionX = foodPositionX;
        this.foodPositionY = foodPositionY;
        this.freeSpace = freeSpace;
        this.vision = vision;
        this.foodVision = foodVision;
        this.currentDirection = currentDirection;
    }


}
