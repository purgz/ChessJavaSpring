package io.github.purgz.dogchess.game;

import engine.Board;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
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

    @Override
    public Game getGameById(UUID id) {

        return allGames.get(id);
    }
}
