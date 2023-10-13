import { useNavigate, Link} from "react-router-dom"
import { useEffect } from "react";
import { Client } from "@stomp/stompjs"


function Home(){

    const client = new Client({
        brokerURL: 'ws://localhost:8080/websocket-test'
    })
    
    client.onConnect = (frame) =>{
        console.log("Connected " + frame);
        client.subscribe("/topic/greetings", (greeting) =>{
            console.log(JSON.parse(greeting.body).content);
        })
    }
    
    function sendName(){
        client.publish({
            destination: "/app/hello",
            body: JSON.stringify({"name": "test name"})
        })
    }

    function connect(){
        client.activate();
    }

    function disconnect(){
        client.deactivate();
    }

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