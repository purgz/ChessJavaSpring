import { useNavigate, Link} from "react-router-dom"
import { useEffect } from "react";
import { Client } from "@stomp/stompjs"

const client = new Client({
    brokerURL: 'ws://localhost:8080/websocket-test'
})

client.onConnect = (frame) =>{
    console.log("Connected " + frame);
    client.subscribe("/topic/greetings", (greeting) =>{

        const board = JSON.parse(greeting.body);
        console.log(board);

        for (let i = 0; i < board.length; i++){
            if (board[i] != '\0'){
                
                console.log(board[i]);
            }
        }
        
    })
}

function sendName(){
    client.publish({
        destination: "/app/startboard",
        body: JSON.stringify({"name": "test name"})
    })
}

function connect(){
    client.activate();
}

function disconnect(){
    void client.deactivate();
}

function Home(){



    return (

        <main>
            <h1>Home page</h1>
            <hr />
            <button onClick={connect}>Connect</button>
            <button onClick={sendName}>Get greeting</button>
            <button onClick={disconnect}>disconnect</button>
            <Link to= {"/game"}>Play game</Link>
        </main>

    )
}

export default Home;