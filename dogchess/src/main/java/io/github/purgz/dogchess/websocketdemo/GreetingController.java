package io.github.purgz.dogchess.websocketdemo;


import engine.Board;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.Arrays;

@Controller
public class GreetingController {

    private Board board = new Board("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2");

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(Message message) throws Exception{

        return new Greeting("Hello");
    }

    @MessageMapping("/startboard")
    @SendTo("/topic/greetings")
    public char[] startBoard(Message message) throws Exception{

        //System.out.println(Arrays.toString(board.getSquares()));
        return board.getSquares();
    }

    @MessageMapping("/moverequest")
    @SendTo("/topic/greetings")
    public char[] moveRequest(MoveRequest move) throws Exception{

        board.doLegalMove(new int[] {move.startSquare, move.endSquare});
        return board.getSquares();
    }


}
