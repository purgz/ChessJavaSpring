import { useNavigate, Link} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../api/axios";


function Home(){

    const navigate = useNavigate();
    let gameId;

    async function createGameAndRedirect(){

        gameId = await createGame();
        
        navigate(`/game/${gameId}`)
    }

    const createGame = async () =>{

        try{
            const res = await axios.post("/game/new-default-game");

            return res.data;
        } catch (error) {

            console.log("Error creating game");
            navigate("/");
        }
    }

    return (

        <main>
            <h1>Home page</h1>
            <hr />

            <button onClick={createGameAndRedirect}>Create new game</button>
            <hr />

            <Link to= {"/game"}>Play game</Link>
        </main>

    )
}

export default Home;