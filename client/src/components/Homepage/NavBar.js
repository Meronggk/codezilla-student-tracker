/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logoimage from "../Homepage/assets/images/logoimage.png";

const NavBar = () => {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	return (
		<div className="header">
			<Link to={"/"}>
				<img
					className="nav-logo"
					src={logoimage}
					alt="cyf_logo"
				/>
			</Link>
			<ul className={click ? "nav-menu active" : "nav-menu"}>
				<li>
					<Link to={"/"}>Trainee</Link>
				</li>
				<li>
					<Link to={"/about"}>Volunteer</Link>
				</li>
				<li>
					<Link to={"/contact"}>Admin</Link>
				</li>
			</ul>
			<div className="hamburger" onClick={handleClick}>
				{click ? (
					<FaTimes size={20} style={{ color: "fff" }} />
				) : (
					<FaBars size={20} style={{ color: "fff" }} />
				)}
			</div>
		</div>
	);
};

export default NavBar;
