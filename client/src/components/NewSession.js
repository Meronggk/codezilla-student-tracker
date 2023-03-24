import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
		fetch("/api/newsession", {
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
			<label htmlFor={"timepicker"}>
				Time:
				<div className="input-group date" id="timepicker">
					<DatePicker
						name="time"
						selected={formData.time}
						onChange={(date) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								time: date,
							}))
						}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="yyyy-MM-dd HH:mm:ss"
						placeholderText="Select time"
					/>

					<span className="input-group-addon">
						<i className="fa fa-calendar"></i>
					</span>
				</div>
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
			<button type="submit" style={{ backgroundColor: "rgb(31, 79, 236)" }}>Create session</button>
		</form>
	);
}

export default NewSession;
