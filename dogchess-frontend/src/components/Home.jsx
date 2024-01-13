import { useNavigate, Link} from "react-router-dom"
import {useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider.jsx";
import useAuth from "../hooks/useAuth.js";

function Home(){

    const {auth} = useAuth();
    const {setAuth} = useContext(AuthContext);

    const navigate = useNavigate();
    let gameId;

    async function createGameAndRedirect(){

        gameId = await createGame();
        
        navigate(`/game/${gameId}`)
    }

    const createGame = async () =>{

        console.log(auth);

        try{
            const res = await axios.post("/game/new-default-game", {},

                {
                    auth: {
                        username: auth.username,
                        password: auth.password
                    }
                }

            );

            return res.data;
        } catch (error) {

            console.log("Error creating game");
            navigate("/home");
        }
    }

    return (

        <main>
            <h1>Home page</h1>
            <hr />

            <button onClick={createGameAndRedirect}>Create new game</button>
            <hr />

            
        </main>

    )
}

export default Home;