import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const backend_url = import.meta.env.VITE_BACKEND_URL


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const getUser = () => {
		const opts = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};
		fetch(backend_url + "api/user", opts)
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data, "get user data");
				dispatch({ type: "update-user", payload: data });

			})
			.catch((err) => console.error(err));
	}

	const syncTokenFromLocalStorageStore = () => {
		const token = localStorage.getItem("token");
		console.log("aplication loaded");
		if (token && token != "" && token != undefined)
			setStore({ token: token });
	}

	useEffect(() => {
		syncTokenFromLocalStorageStore()
	}, [])


	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
}; 