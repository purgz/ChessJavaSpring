package io.github.purgz.dogchess.websocket;

public class MoveRequest {

    int startSquare;
    int endSquare;

    public int getStartSquare() {
        return startSquare;
    }

    public void setStartSquare(int startSquare) {
        this.startSquare = startSquare;
    }

    public int getEndSquare() {
        return endSquare;
    }

    public void setEndSquare(int endSquare) {
        this.endSquare = endSquare;
    }

    public MoveRequest() {
    }

    public MoveRequest(int startSquare, int endSquare) {
        this.startSquare = startSquare;
        this.endSquare = endSquare;
    }
}
