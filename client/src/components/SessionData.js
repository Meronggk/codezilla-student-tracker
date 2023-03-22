import React from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Choose Session Data" } };
const baseURL = "http://localhost:3100/api";

const SessionData = () => {
	// Create state variables
	let [responseData, setResponseData] = React.useState("");
	const [checked, setChecked] = React.useState(true);

	// fetches data
	const fetchAllData = (e) => {
		e.preventDefault();

		axios
			.get(baseURL + "/getAllSession")
			.then((response) => {
				setResponseData(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const fetchUpcommingData = (e) => {
		e.preventDefault();
		axios
			.get(baseURL + "/getUpcomingSession")
			.then((response) => {
				setResponseData(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (event) => {
		setChecked(event.target.checked);
		if (checked) {
			fetchAllData(event);
		} else {
			fetchUpcommingData(event);
		}
	};

	return (
		<div>
			<div>
				<Switch
					{...label}
					defaultChecked
					color="warning"
					checked={checked}
					onChange={handleChange}
				/>
			</div>

			{responseData &&
				responseData.map((sessionData) => {
					return (
						<p key={sessionData.id}>
							{sessionData.id}---{sessionData.name}--{sessionData.time}--
							{sessionData.meeting_url}--{sessionData.cohort_id}
						</p>
					);
				})}
		</div>
	);
};

export default SessionData;