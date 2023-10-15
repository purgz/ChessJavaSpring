import { useNavigate, Link} from "react-router-dom"
import { useEffect } from "react";


function Home(){



    return (

        <main>
            <h1>Home page</h1>
            <hr />
            <Link to= {"/game"}>Play game</Link>
        </main>

    )
}

export default Home;