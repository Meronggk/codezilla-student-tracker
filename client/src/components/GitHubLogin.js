import React from "react";
//import "./App.css";
// import { GitHubLogin } from 'react-github-login'
//import logo from './logo.svg';
import { useEffect, useState } from "react";

const CLIENT_ID = "438f9e1d00fa92021341";

function GitHubLogin() {
	const [rerender, setRerender] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const codeParam = urlParams.get("code");
		console.log(codeParam);

		if (codeParam && localStorage.getItem("accessToken" === null)) {
			// eslint-disable-next-line no-inner-declarations
			async function getAccessToken() {
				await fetch("/api/getAcessToken?code=" + codeParam, {
					method: "GET",
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						console.log(data);
						if (data.access_token) {
							localStorage.setItem("accessToken", data.access_token);
							setRerender(!rerender);
						}
					});
			}
			getAccessToken();
		}
	}, [rerender]);

	// eslint-disable-next-line no-unused-vars
	async function getUserData() {
		await fetch("/api/getUserData", {
			method: "GET",
			header: {
				Authorization: "Bearer " + localStorage.getItem("accessToken"),
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
		getUserData();
	}

	return (
		<div className="App">
			<header className="App-header">
				<button className="gitbtn">
					<a
						href={
							"https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
						}
					>
						Login with Github
					</a>
				</button>
			</header>
		</div>
	);
}

export default GitHubLogin;
