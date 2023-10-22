package io.github.purgz.dogchess.websocket;


import io.github.purgz.dogchess.game.Game;
import io.github.purgz.dogchess.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.UUID;

@Controller
public class GameSocketController {

    GameService gameService;

    @Autowired
    public GameSocketController(GameService gameService){
        this.gameService = gameService;
    }


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

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event){
        System.out.println(event);
    }
}
