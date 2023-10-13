import { useNavigate, Link} from "react-router-dom"

function Home(){


    //need to have a button to create a game which then navigates to game
    //connects to socket with the game uuid
    //other users can then connect using the same uuid

    return (

        <main>
            <h1>Home page</h1>
            <hr />
            <Link to= {"/game"}>Play game</Link>
        </main>

    )
}

export default Home;