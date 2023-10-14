import { useNavigate, Link} from "react-router-dom"
import Board from "./Board.jsx";

function Game(){

  

    return (

        <main>
            <h1>Game page</h1>
            <hr />

            <Board/>

            <hr/>
            <Link to={"/"}>back home</Link>
        </main>

    )
}

export default Game;