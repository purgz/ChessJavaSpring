package io.github.purgz.dogchess.game;

import engine.Board;

import java.util.UUID;

public class Game {

    private Board board;

    private UUID boardId;

    public Game(Board board, UUID boardId) {
        this.board = board;
        this.boardId = boardId;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public UUID getBoardId() {
        return boardId;
    }

    public void setBoardId(UUID boardId) {
        this.boardId = boardId;
    }
}
