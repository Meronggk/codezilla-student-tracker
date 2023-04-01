import React from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks

function LogoutButton() {
	const navigate = useNavigate();
	function handleEvent() {
		setTimeout(() => {
			navigate("/");
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
				style={{
					width: "100%",
					backgroundColor: "rgb(31, 79, 236)",
					padding: "1rem",
					margintop: "1rem",
					fontsize: "1.6rem",
					color: "fff",
					border: "none",
					borderRadius: "0.25rem",
					cursor: "pointer",
					display: "block",
					fontFamily: "serif",
					fontSize: "20px",
					position: "relative",
					top: "1rem",
				}}
			>
				Logout
			</button>
		</div>
	);
}
export default LogoutButton;
