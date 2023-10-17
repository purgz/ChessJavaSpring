package io.github.purgz.dogchess.game;

import java.util.UUID;

public interface GameService {

    public Game getGameById(UUID id);

    public UUID createNewGame();
}
