import React, { useState } from "react";
import GithubLogin from "../components/GitHubLogin";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import SwitchRoles from "./SwitchRoles";

const Login = ({ onLogin }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	const handleLogin = () => {
		fetch("/api/signin", {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
				role: role,
			}),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				onLogin(data);
				navigate("/dashboard"); // redirect to dashboard on successful login
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="body">
			<div className="login-form">
				<div>
					<h3 className="first-line">Log in</h3>
				</div>
				<div>
					<div className="email">
						<input
							type="email"
							placeholder="user name or email"
							value={email}
							name="email"
							onChange={(event) => setEmail(event.target.value)}
							required
						></input>
					</div>
					<div className="email">
						<input
							type="password"
							placeholder="Password"
							value={password}
							name="password"
							onChange={(event) => setPassword(event.target.value)}
							required
						></input>
					</div>

					<button className="button" onClick={handleLogin}>
						Login
					</button>
					<p>or</p>
				</div>
				<GithubLogin />
				<SwitchRoles role={role} setRole={setRole} />
			</div>
		</div>
	);
};

export default Login;
