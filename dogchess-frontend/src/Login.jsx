import { useRef, useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
const LOGIN_URL = "/login";

import {Link, useNavigate} from "react-router-dom";

const Login = () =>{

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() =>{
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {

            const response = await axios.post(LOGIN_URL,
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            //console.log(JSON.stringify(response));

            const username = response?.data?.username;
            const password = response?.data?.password;
            const authorities = response?.data?.authorities;

            setAuth({username,password,authorities})

            // console.log(username, password, authorities)

            setUser('');
            setPwd('');
            navigate("/home");

        } catch (error) {
            if (!error?.response){
                setErrMsg("No server response");
            } else if (error.response?.status === 400){
                setErrMsg("Missing username or password");
            } else if (error.response?.status === 401){
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }

    }

    return (
        <section>

            <p ref = {errRef}>{errMsg}</p>

            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <button>Sign in</button>
            </form>


        </section>
    )
}


export default Login;