import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import github_icon from "../components/Homepage/assets/images/github_icon.png";

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

	const navigate = useNavigate();
	function handleEvent() {
		navigate("/signin");
	}
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
				<button className="gitbtn" onClick={handleEvent}>
					<a
						href={
							"https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
						}
					>
						<img src={github_icon} alt="GitHub icon"
						style={{ width: "20px", height: "20px", marginRight: "10px",
}} />
						Login with Github
					</a>
				</button>
			</header>
		</div>
	);
}

export default GitHubLogin;
