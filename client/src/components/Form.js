import React, { useState } from "react";
import "./Form.css";

const Form = () => {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [attendance, setAttendance] = useState(false);
	const [notes, setNotes] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newUser = { name, attendance, notes };

		const response = await fetch("/api/form", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		});

		const updatedUsers = await response.json();
		setUsers(updatedUsers);
		setName("");
		setAttendance(false);
		setNotes("");
	};

	return (
		<div>
			<h2>List of Users</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Attendance</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.name}</td>
							<td>{user.attendance ? "Yes" : "No"}</td>
							<td>{user.notes}</td>
						</tr>
					))}
					<tr>
						<td>
							<input
								type="text"
								value={name}
								onChange={(event) => setName(event.target.value)}
								placeholder="Enter name"
							/>
						</td>
						<td>
							<label>
								<input
									type="checkbox"
									checked={attendance}
									onChange={(event) => setAttendance(event.target.checked)}
								/>
								Attendance
							</label>
						</td>
						<td>
							<textarea
								value={notes}
								onChange={(event) => setNotes(event.target.value)}
								placeholder="Enter notes"
							></textarea>
						</td>
						<td>
							<button onClick={handleSubmit}>Save</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Form;
