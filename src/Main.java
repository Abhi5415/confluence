public class Main {
    public static void main(String[] args) {
        Snake s = new Snake();

        Game g = new Game(s);

        g.debug();
        g.play();
        g.play();
        g.play();

//        g.debug();

    }
}
