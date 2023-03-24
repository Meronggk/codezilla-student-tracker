/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logoimage from "../Homepage/assets/images/logoimage.png";
import SwitchRoles from "../SwitchRoles";

const NavBar = () => {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	return (
		<div className="header">
			<Link to={"/"}>
				<img className="nav-logo" src={logoimage} alt="cyf_logo" />
			</Link>
			<ul className={click ? "nav-menu active" : "nav-menu"}>
				<li>
					<Link to={"/"}>Home</Link>
				</li>
				<li>
					<Link to={"/about"}>About</Link>
				</li>
				<li>
					{/* <Link to={"/roles"}> */}
					<SwitchRoles />
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
