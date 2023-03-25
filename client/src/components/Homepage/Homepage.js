import React from "react";
import "./Homepage.css";
import img2 from "../Homepage/assets/images/img2.jpg";
import img3 from "../Homepage/assets/images/img3.jpg";
// import { useNavigate } from "react-router-dom";

import GitHubLogin from "../GitHubLogin";

const Homepage = () => {
	// const navigate = useNavigate();
	// function handleEvent() {
	// 	navigate("/dashboard");
	// }

	return (
		<div className="container">
			<div className="container1">
				<img src={img2} alt="img2" />
				<img src={img3} alt="img3" />
			</div>
			<div>
				<h2 className="home-page">WELCOME TO CYF SESSIONS </h2>
		<GitHubLogin />
			</div>

		</div>
	);
};

export default Homepage;
