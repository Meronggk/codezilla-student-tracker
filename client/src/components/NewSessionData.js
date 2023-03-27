import { useState, useEffect } from "react";
import axios from "axios";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import SingleSession from "./SingleSession";
// const label = { inputProps: { "aria-label": "Choose Session Data" } };

const NewSessionData = () => {
	// Create state variables
	const [value, setValue] = useState(1);
	let [responseData, setResponseData] = useState([]);
	const [filterData, setFilterData] = useState([]);

	// fetches data
	const fetchAllData = () => {
		axios
			.get("/api/getAllSession")
			.then((response) => {
				setResponseData(response.data);
				handleFilterData(value, response.data);
				// setFilterData(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		fetchAllData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFilterData = (val, data) => {
		if (val) {
			setFilterData(
				data.filter((sessionData) => {
					const time = new Date(sessionData.time);
					return time > today;
				})
			);
		} else {
			setFilterData(data);
		}
	};
	const handleChange = (val) => {
		setValue(val);
		handleFilterData(val, responseData);
	};
	const today = new Date().setHours(0, 0, 0, 0);

	return (
		<div>
			<div>
				<ToggleButtonGroup
					type="radio"
					name="options"
					value={value}
					onChange={handleChange}
				>
					<ToggleButton id="tbg-btn-1" value={0}>
						All Sessions
					</ToggleButton>
					<ToggleButton id="tbg-btn-2" value={1}>
						Upcoming Sessions
					</ToggleButton>
				</ToggleButtonGroup>
			</div>

			{filterData.map((sessionData) => {
				return <SingleSession sessionData={sessionData} key={sessionData.id} />;
			})}
		</div>
	);
};

export default NewSessionData;
