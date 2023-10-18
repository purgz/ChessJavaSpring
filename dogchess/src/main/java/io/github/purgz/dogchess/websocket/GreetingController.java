package io.github.purgz.dogchess.websocket;


import engine.Board;
import io.github.purgz.dogchess.game.Game;
import io.github.purgz.dogchess.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class GreetingController {

    GameService gameService;

    @Autowired
    public GreetingController(GameService gameService){
        this.gameService = gameService;
    }

    private Board board = new Board("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2");


    @MessageMapping("/game/{gameId}")
    @SendTo("/topic/greetings/{gameId}")
    public char[] startBoard(@DestinationVariable UUID gameId) throws Exception{

        Game game = gameService.getGameById(gameId);

        return game.getBoard().getSquares();
    }

    @MessageMapping("/move-request/{gameId}")
    @SendTo("/topic/greetings/{gameId}")
    public char[] moveRequest(@DestinationVariable UUID gameId,MoveRequest move) throws Exception{

        Game game = gameService.getGameById(gameId);

        game.getBoard().doLegalMove(new int[] {move.startSquare, move.endSquare});

        return game.getBoard().getSquares();
    }

    // TODO: 17/10/2023 Organize socket code properly, remove this demo 


}
