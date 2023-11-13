package io.github.purgz.pogchess.websocket;


import io.github.purgz.pogchess.game.Game;
import io.github.purgz.pogchess.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

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

    /*
    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event){
        System.out.println(event);
    }
     */

    @EventListener
    public void onConnectToGame(SessionSubscribeEvent event){
        System.out.println(event);
    }

    @EventListener
    public void onDisconnectFromGame(SessionDisconnectEvent event){
        System.out.println(event);
    }

    //add principal of user to disconnect event
    //when a user disconnects, find the game that they are currently in,
    //delete the game from the hashmap if both users have disconnected
}
