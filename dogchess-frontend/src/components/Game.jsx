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

function sendMove(){
    client.publish({
        destination: "/app/moverequest",
        body: JSON.stringify({"startSquare": 8, "endSquare": 16})
    })
}

function connect(){
    client.activate();
}

function disconnect(){
    void client.deactivate();
}

function verifyMove(){
    //here we will have logic for communicating with server
    
    return true;
}

function dropPiece(e){
    e.preventDefault();
    let data = e.dataTransfer.getData("text");   
    if (verifyMove()){
        e.target.replaceChildren(document.getElementById(data));
    } 
}



function Game(){

    //want socket code to go here to get the board from the server

    //want a setState to set the player move and pass as props to board so it can be set from the board component

    //verify move function passed as props to board for updating the board if the move is valid

    const startBoard = ["r", "n", "b", "q", "k", "b", "n", "r", "p", "p", "p", "p", "p", "p", "p", "p",
    '\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0',
    '\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0' ,'\0' ,'\0',
    "P", "P", "P", "P", "P", "P", "P", "P", "R", "N", "B", "Q", "K", "B", "N", "R"];

    const [board, setBoard] = useState([]);

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
            <button onClick={sendMove}>click</button>
            <Board dropPiece = {dropPiece} board = {board}/>

            <hr/>
            <Link to={"/"}>back home</Link>
        </main>

    )
}

export default Game;