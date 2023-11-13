package io.github.purgz.pogchess.game;

import engine.Board;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class GameServiceImpl implements GameService{

    private static Map<UUID, Game> allGames = new HashMap<>();

    @PostConstruct
    private void setGamesForDev(){
        Game testGame = new Game(new Board(), UUID.randomUUID());

        System.out.println(testGame.getBoardId());
        allGames.put(testGame.getBoardId(), testGame);
    }

    public Game getGameById(UUID id) {

        return allGames.get(id);
    }

    //creates a new game and returns the game id
    public UUID createNewGame(){

        Board board = new Board();
        UUID gameId = UUID.randomUUID();
        Game game = new Game(board, gameId);
        allGames.put(gameId, game);

        return gameId;
    }

    public Set<UUID> allGames(){

        return allGames.keySet();
    }
}
