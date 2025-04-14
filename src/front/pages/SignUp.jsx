import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { backend_url } from "./Home.jsx";

export const SignUp = () => {
  const { store, dispatch } = useGlobalReducer()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (email, password) => {
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
      const resp = await fetch(backend_url + "api/signup", opts);
      if (resp.status !== 200) {
        alert("There has been an error");
        return false;
      }
      const data = await resp.json();
      console.log(data, "signup data");

      return true;
    } catch (error) {
      console.error("there has been an error during signup");
    }
  }


  return (
    <div className="text-center mt-5">
      <h1>Signup</h1>

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
        <button onClick={() => handleSignUp(email, password)}>Signup</button>
      </div>
    </div>
  )
}