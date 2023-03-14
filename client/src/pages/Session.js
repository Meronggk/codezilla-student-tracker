import React, { useState, useEffect } from "react";

function NewSession() {
	const [cohorts, setCohorts] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		time: "",
		meetingUrl: "",
		cohortId: "",
	});

	// Fetch the list of cohorts from the backend
	useEffect(() => {
		async function fetchCohorts() {
			try {
				const response = await fetch("/api/cohorts").then();
				const data = await response.json();
				setCohorts(data);
				console.log("data:", data);
			} catch (error) {
				console.error(error);
			}
		}
		fetch("/api/cohorts")
			.then((response) => response.json())
			.then((data) => console.log(data));

		fetchCohorts();
	}, []);

	// Handle changes to the form data
	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}

	// Handle form submissions
	function handleSubmit(event) {
		event.preventDefault();
		fetch("/api/sessions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
			.then(() => {
				// Reset the form
				setFormData({
					name: "",
					time: "",
					cohortId: "",
					meetingUrl: "",
				});
			})
			.catch((error) => console.error(error));
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name:
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Time:
				<input
					type="text"
					name="time"
					value={formData.time}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Meeting URL:
				<input
					type="text"
					name="meetingUrl"
					value={formData.meetingUrl}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Cohort:
				<select
					name="cohortId"
					value={formData.cohortId}
					onChange={handleChange}
				>
					<option value="">Select a cohort</option>
					{Array.isArray(cohorts) &&
						cohorts.map((cohort) => (
							<option key={cohort.id} value={cohort.id}>
								{cohort.name}
							</option>
						))}
				</select>
			</label>
			<br />
			<button type="submit">Create session</button>
		</form>
	);
}

export default NewSession;
