import './App.css'
import {Outlet, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import Game from './components/Game';
import RequireAuth from "./RequireAuth.jsx";
import Login from "./Login.jsx";

function App() {


	return (
		
		<Routes>

			<Route path = "/" element = {<Outlet/>}>


				<Route path="/" element = {<Login/>}></Route>

				<Route element={<RequireAuth/>}>
					<Route path = "/home" element = {<Home/>}></Route>

					<Route path = "/game/:gameId" element = {<Game/>}></Route>
				</Route>

				<Route path = "*" element = {<Navigate to="/" replace></Navigate>}></Route>
			</Route>

		</Routes>
	)
}

export default App
