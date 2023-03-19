import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();
	function handleEvent() {
		setTimeout(() => {
			navigate("/signin");
			console.log("You have been logged out.");
		}, 2000);
	}
	const handleLogout = () => {
		fetch("/api/logout", {
			method: "POST",
			credentials: "include",
		}).then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText);
			}
		});
	};
	return (
		<div>
			<button
				onClick={() => {
					handleLogout();
					handleEvent();
				}}
			>
				Logout
			</button>
		</div>
	);
}
export default LogoutButton;
