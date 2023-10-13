package io.github.purgz.dogchess.websocketdemo;

public class Message {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Message() {
    }

    public Message(String name) {
        this.name = name;
    }
}
