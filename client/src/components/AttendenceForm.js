import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AttendanceForm.css";

const fakeUsers = [];

function AttendanceForm() {
	const { sessionId } = useParams();
	const [users, setUsers] = useState(fakeUsers);

	useEffect(() => {
		const url = `/api/users/trainee?session_id=${sessionId}`;
		const fetchData = () => {
			fetch(url)
				.then((res) => res.json())
				.then((data) =>
					setUsers(
						data.map((user) => ({ ...user, attendance: "In Person", note: "" }))
					)
				);
		};
		fetchData();
	}, [sessionId]);

	const handleAttendanceChange = (index, value) => {
		const updatedUsers = [...users];
		updatedUsers[index].attendance = value;
		setUsers(updatedUsers);
	};

	const handleNoteChange = (index, value) => {
		const updatedUsers = [...users];
		updatedUsers[index].note = value;
		setUsers(updatedUsers);
	};

	const handleSave = () => {
		if (sessionId) {
			fetch(`/api/attendance/${sessionId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					users.map((user) => {
						return {
							user_id: user.id,
							session_id: sessionId,
							notes: user.note,
						};
					})
				),
			})
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((error) => console.error(error));
		} else {
			console.log("Invalid session ID");
		}
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Users</th>
						<th>Attendance</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.name}</td>
							<td>
								<select
									value={user.attendance}
									onChange={(e) =>
										handleAttendanceChange(index, e.target.value)
									}
								>
									<option value="In Person">In Person</option>
									<option value="Remote">Remote</option>
									<option value="Camera Off">Camera Off</option>
									<option value="Left Early">Left Early</option>
								</select>
							</td>
							<td>
								<input
									type="text"
									value={user.note}
									onChange={(e) => handleNoteChange(index, e.target.value)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={handleSave}>Save</button>
		</div>
	);
}

export default AttendanceForm;
