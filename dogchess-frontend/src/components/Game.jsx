import { useNavigate, Link} from "react-router-dom"
import Board from "./Board.jsx";
import { useState } from "react";

function Game(){

    //server returns array [p,p,p,p,p...., ,k....]
    const startBoard = ["r", "n", "b", "q", "k", "b", "n", "r", "p", "p", "p", "p", "p", "p", "p", "p",
    '\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0',
    '\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0','\0' ,'\0' ,'\0',
    "P", "P", "P", "P", "P", "P", "P", "P", "R", "N", "B", "Q", "K", "B", "N", "R"];


    const [board, setBoard] = useState(startBoard);

    return (

        <main>
            <h1>Game page</h1>
            <button onClick={() => setBoard("")}>TEST BUTTON TO CHANGE BOARD STATE</button>
            <hr />

            <Board board = {board}/>

            <hr/>
            <Link to={"/"}>back home</Link>
        </main>

    )
}

export default Game;