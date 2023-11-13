package io.github.purgz.pogchess.game;

import java.util.Set;
import java.util.UUID;

public interface GameService {

    public Game getGameById(UUID id);

    public UUID createNewGame();

    public Set<UUID> allGames();
}
