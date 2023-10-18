import './App.css'
import {Outlet, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Game from './components/Game';

function App() {


	return (
		
		<Routes>

			<Route path = "/" element = {<Outlet/>}>

				<Route path = "/" element = {<Home/>}></Route>

				<Route path = "/game/:gameId" element = {<Game/>}></Route>
			</Route>

		</Routes>
	)
}

export default App
