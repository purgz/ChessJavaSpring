package io.github.purgz.pogchess.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("game")
public class GameController {


    private GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }


    @PostMapping("/new-default-game")
    public UUID newDefaultGame(@AuthenticationPrincipal UserDetails userDetails){

        //System.out.println(userDetails.getUsername() + " CREATED A GAME");

        return gameService.createNewGame();
    }

    @GetMapping("/{gameId}")
    public Game getGameById(@PathVariable UUID gameId){

        Optional<Game> game = Optional.ofNullable(gameService.getGameById(gameId));

        if (game.isEmpty()){
            //throw a custom exception at some point
            throw new RuntimeException("Game with id " + gameId + " not found");
        }

        return game.get();
    }

    @GetMapping("/all-games")
    public Set<UUID> getALlGames(){


        return gameService.allGames();
    }
}
