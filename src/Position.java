public class Position {
    int row;
    int col;

    public Position() {
        this.row = 5;
        this.col = 5;
    }

    public Position(int row, int col) {
        this.row = row;
        this.col = col;
    }

    @Override
    public String toString() {
        return "Position{" +
                "row=" + row +
                ", col=" + col +
                '}';
    }
}
