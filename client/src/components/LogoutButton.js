import React from "react";

function LogoutButton() {
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
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
export default LogoutButton;
