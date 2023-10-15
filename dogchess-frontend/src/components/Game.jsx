import { useNavigate, Link} from "react-router-dom"
import Board from "./Board.jsx";
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs"

const client = new Client({
    brokerURL: 'ws://localhost:8080/websocket-test'
})

function sendName(){
    if (client.connected){
        client.publish({
            destination: "/app/startboard",
            body: JSON.stringify({"name": "test name"})
        })
    }
}

function sendMove(startSquare, endSquare){
    client.publish({
        destination: "/app/moverequest",
        body: JSON.stringify({"startSquare": startSquare, "endSquare": endSquare})
    })
}

function connect(){
    client.activate();
}

function disconnect(){
    void client.deactivate();
}

function Game(){



    const startBoard = ["r", "n", "b", "q", "k", "b", "n", "r", "p", "p", "p", "p", "p", "p", "p", "p",
    '\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0',
    '\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0' ,'\0' ,'\0',
    "P", "P", "P", "P", "P", "P", "P", "P", "R", "N", "B", "Q", "K", "B", "N", "R"];

    const [board, setBoard] = useState([]);
    
    
    let startSquare = -1;
    let endSquare = -1;

    function dragPiece(e){

      const pieceSquare = e.target.parentNode.parentNode.getAttribute("data-squareid");
      startSquare = pieceSquare;

    }

  
    function dropPiece(e){
      e.preventDefault();
      
      if (e.target.className != "square"){
        endSquare = e.target.parentNode.parentNode.getAttribute("data-squareid");
      } else {
        endSquare = e.target.getAttribute("data-squareid");
      }  
      console.log(startSquare,endSquare)
      sendMove(startSquare,endSquare);
      
      startSquare = -1;
      endSquare = -1;      
    }

    client.onConnect = (frame) =>{
        console.log("Connected " + frame);

        sendName();
        
        client.subscribe("/topic/greetings", (greeting) =>{
    
            const board = JSON.parse(greeting.body);
            console.log(board);
            setBoard(board);
        })
    }


    useEffect(()=>{
        connect();
    })

    return (

        <main>
            <h1>Game page</h1>
            <button onClick={() => setBoard("")}>TEST BUTTON TO CHANGE BOARD STATE</button>
            <hr />
        
            <Board dropPiece = {dropPiece} dragPiece={dragPiece} board = {board}/>

            <hr/>
            <Link to={"/"}>back home</Link>
        </main>

    )
}

export default Game;