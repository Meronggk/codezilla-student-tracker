import React from "react";
import { FaFacebookF, FaGit, FaInstagram, FaTwitter } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FcDocument } from "react-icons/fc";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<div>
				<ul className="footer_items">
					<li className="footer_item">
						<a
							href="https://www.codeyourfuture.io"
							target="_blank"
							rel="noopener noreferrer"
							className="footer_link-item"
							style={{ color: "black" }}
						>
							<CgWebsite />
						</a>
					</li>
					<li className="footer_item">
						<a
							href="https://docs.codeyourfuture.io"
							target="_blank"
							rel="noopener noreferrer"
							className="footer_link-item"
							style={{ color: "black" }}
						>
							<FcDocument />
						</a>
					</li>
					<li className="footer_item">
						<a
							href="https://github.com/codeyourfuture/"
							target="_blank"
							rel="noopener noreferrer"
							className="footer_link-item"
							style={{ color: "black" }}
						>
							<FaGit />
						</a>
					</li>
				</ul>
			</div>
			<div className="copyright">
				<div>
					Created by Codezilla - Copyright © {new Date().getFullYear()}{" "}
					CodeYourFuture
				</div>
			</div>
			<div>
				<ul className="footer_items">
					<li className="footer_item">
						<a
							href="https://www.facebook.com/codeyourfuture.io"
							target="_blank"
							rel="noopener noreferrer"
							className="footer_link-fb"
						>
							<FaFacebookF />
						</a>
					</li>
					<li className="footer_item">
						<a
							href="https://www.instagram.com/codeyourfuture_"
							target="_blank"
							rel="noopener noreferrer"
							className="footer_link-insta"
						>
							<FaInstagram />
						</a>
					</li>
					<li className="footer_item">
						<a
							href="https://twitter.com/CodeYourFuture"
							target="_blank"
							rel="noopener noreferrer"
							className="footer_link-twitter"
						>
							<FaTwitter />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
