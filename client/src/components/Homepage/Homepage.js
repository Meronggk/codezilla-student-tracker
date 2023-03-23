import React from "react";
import "./Homepage.css";
import img2 from "../Homepage/assets/images/img2.jpg";
import img3 from "../Homepage/assets/images/img3.jpg";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
	const navigate = useNavigate();
	function handleEvent() {
		navigate("/signin");
	}

	return (
		<div className="container">
			<div className="container1">
				<img src={img2} alt="img2" />
				<img src={img3} alt="img3" />

			</div>
			<div>
				<h2 className="home-page">WELCOME TO CYF SESSIONS </h2>
				<button className="btn" onClick={handleEvent}>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default Homepage;
