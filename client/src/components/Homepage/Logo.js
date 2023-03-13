import React from "react";
import { Navbar } from "react-bootstrap";

const Logo = () => {
	return (
		<Navbar className="nav">
			<img
				className="App-logo"
				src="https://syllabus.codeyourfuture.io/img/logo.png"
				alt="cyf_logo"
			/>
		</Navbar>
	);
};

export default Logo;
