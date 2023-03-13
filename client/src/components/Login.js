import React, { useState } from "react";
import GithubLogin from "../components/GitHubLogin";
import "./Login.css";

const Login = ({ onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogIn = () => {
		fetch(`${process.env.REACT_APP_BACK_END_URL}/signin`, {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				onLogin(data);
			});
	};
	return (
		<div className="body">
			<div className="login-form">

				<div>
					<h3 className="first-line">CLASS REGISTER</h3>
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
							type="Password"
							placeholder="Password"
							value={password}
							name="password"
							onChange={(event) => setPassword(event.target.value)}
							required
						></input>
					</div>
					<button className="button" onClick={onLogIn}>
						Login
					</button>
					<p>or</p>
				</div>
				<GithubLogin />
			</div>
		</div>
	);
};

export default Login;
