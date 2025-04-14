import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()

	const logout = () => {
		localStorage.removeItem("token");
		dispatch({ type: "update-token", payload: null });
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ms-auto">
					{!store.token ? (
						<Link to="/login">
							<button className="btn btn-primary">log in</button>
						</Link>
					) : (
						<button
							onClick={() => logout()}
							className="btn btn-primary"
						>
							log out
						</button>
					)}
					<Link to="/signUp">
						<button className="btn btn-primary ms-3">Sign Up</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};