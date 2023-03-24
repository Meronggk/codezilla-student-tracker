import React from "react";
import axios from "axios";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// const label = { inputProps: { "aria-label": "Choose Session Data" } };

const NewSessionData = () => {
	// Create state variables
	const [value, setValue] = React.useState(1);
	let [responseData, setResponseData] = React.useState("");
	// const [checked, setChecked] = React.useState(true);

	// fetches data
	const fetchAllData = () => {
		axios
			.get("api/getAllSession")
			.then((response) => {
				setResponseData(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const fetchUpcommingData = () => {
		axios
			.get("api/getUpcomingSession")
			.then((response) => {
				setResponseData(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (val) => {
		setValue(val);
		if (val === 1) {
			fetchAllData();
		} else {
			fetchUpcommingData();
		}
	};

	return (
		<div>
			<div>
				<ToggleButtonGroup
					type="radio"
					name="options"
					value={value}
					onChange={handleChange}
				>
					<ToggleButton id="tbg-btn-1" value={1}>
						All Sessions
					</ToggleButton>
					<ToggleButton id="tbg-btn-2" value={2}>
						UpComming Sessions
					</ToggleButton>
				</ToggleButtonGroup>
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

export default NewSessionData;
