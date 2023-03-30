import React, { useState } from "react";

function RegisterUser() {
	const [name, setName] = useState("");
	const [githubUsername, setGithubUsername] = useState("");
	const [role, setRole] = useState("");
	const [region, setRegion] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/registerUsers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, githubUsername, role, region }),
		});
		if (response.ok) {
			const user = await response.json();
			alert(`User ${user.name} created!`);

			setName("");
			setGithubUsername("");
			setRole("");
			setRegion("");
		} else {
			alert("Error creating user.");
		}
	};

	return (
		<div>
			<h1>Create User</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Github Username:
					<input
						type="text"
						value={githubUsername}
						onChange={(e) => setGithubUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Role:
					<select value={role} onChange={(e) => setRole(e.target.value)}>
						<option value="">Select a role</option>
						<option value="admin">Volunteer</option>
						<option value="user">Trainee</option>
					</select>
				</label>
				<br />
				<label>
					Region:
					<select value={region} onChange={(e) => setRegion(e.target.value)}>
						<option value="">Select a region</option>
						<option value="West">West Midlands</option>
						<option value="North">Scotland</option>
						<option value="South">London</option>
						<option value="North">North West</option>
						<option value="South">Cape Town</option>
					</select>
				</label>
				<br />
				<button type="submit" style={{ backgroundColor: "rgb(31, 79, 236)" }}>
					Register New User
				</button>
			</form>
		</div>
	);
}

export default RegisterUser;
