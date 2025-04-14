import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { backend_url } from "./Home.jsx";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (email, password) => {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        try {
            const resp = await fetch(backend_url + "api/login", opts);
            if (resp.status !== 200) {
                alert("There has been an error");
                return false;
            }
            const data = await resp.json();

            localStorage.setItem("token", data.access_token);
            dispatch({ type: "update-token", payload: data.access_token });
            return true;
        } catch (error) {
            console.error("there has been an error during  log in");
        }
    }


    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            {store.token && store.token != "" && store.token !== undefined ? (
                "You are logged in with this token" + store.token
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => handleLogin(email, password)}>Login</button>
                </div>
            )}
        </div>
    )
}