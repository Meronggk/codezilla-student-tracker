/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
//import GitHubLogin from "../components/GitHubLogin";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const GitHubCalllBack = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	console.log(searchParams);
	console.log(setSearchParams);

	const paramCode = searchParams.get("code");
	console.log(paramCode);
	const [loginError, setLoginError] = useState();
	function LoginUser() {
		axios.post("/api/callback", { log: paramCode }).then((result) => {
			console.log(result);
			if (result.data.error) {
				console.log("You can`t login, access to your manager");
				setLoginError("You can`t log in please contact your admin"); // callback
			} else {
				console.log("You are logged in");
				navigate("/dashboard");
			}

		});
	}
	useEffect(() => {
		LoginUser();
	});

	return (
		<div>
			{loginError !== undefined ? (
				<div>
					<p>{loginError}</p>
					<button
						onClick={() => {
							navigate("/");
						}}
					>
						{" "}
						Return to Homepage
					</button>
				</div>
			) : (
				<Spinner animation="grow" style={{ justifySelf: "center" }} />
			)}
		</div>
	);
};

export default GitHubCalllBack;
