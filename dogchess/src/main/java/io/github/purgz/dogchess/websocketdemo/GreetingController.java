package io.github.purgz.dogchess.websocketdemo;


import engine.Board;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.Arrays;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(Message message) throws Exception{

        return new Greeting("Hello");
    }

    @MessageMapping("/startboard")
    @SendTo("/topic/greetings")
    public char[] startBoard(Message message) throws Exception{
        Board board = new Board();
        //System.out.println(Arrays.toString(board.getSquares()));
        return board.getSquares();
    }

}
