import React from "react";
import "./Homepage.css";
import img2 from "../Homepage/assets/images/img2.jpg";
import img3 from "../Homepage/assets/images/img3.jpg";
import Carousel from "react-bootstrap/Carousel";
import GitHubLogin from "../GitHubLogin";

const Homepage = () => {
	return (
		<div>
			<Carousel>
				<Carousel.Item interval={1000}>
					<img className="d-block w-100 banner-image" src={img2} alt="img2" />
				</Carousel.Item>
				<Carousel.Item interval={1000}>
					<img className="d-block w-100 banner-image" src={img3} alt="img3" />
				</Carousel.Item>
			</Carousel>
			<div className="banner-login">
				<h3>Welcome to CYF Sessions</h3>
				<GitHubLogin />
			</div>
		</div>
	);
};

export default Homepage;
