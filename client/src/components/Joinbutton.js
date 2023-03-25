// import React, { useState, useEffect } from "react";
// import { isWithinInterval, add } from "date-fns";
// // import Button from "react-bootstrap/Button";
// import "./Joinbutton.css";

// function JoinButton() {
// 	const [isClickable, setIsClickable] = useState(false);
// 	const [jointime, setJoinTime] = useState("");
// 	const [meetingurl, setMeetingUrl] = useState("");
// 	useEffect(() => {
// 		const currentTime = new Date();
// 		const targetTime = new Date();
// 		targetTime.setHours(14, 50, 0); // set target time to 10:00 AM
// 		const isAfterClass1Hour = add(targetTime, { hours: 1, minutes: 10 });
// 		setIsClickable(
// 			isWithinInterval(currentTime, {
// 				start: targetTime,
// 				end: isAfterClass1Hour,
// 			})
// 		);
// 		console.log(
// 			isWithinInterval(currentTime, {
// 				start: targetTime,
// 				end: isAfterClass1Hour,
// 			})
// 		);
// 	}, []);

// 	async function handleClick() {
// 		const requestOptions = {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ id: 1 }),
// 		};

// 		const response = await fetch("http://localhost:3100/api/joinSession", requestOptions);
// 		const data = await response.json();
// 		setMeetingUrl(data.meetingurl);
// 		setJoinTime(data.jointime);

// 	}
// 	// if (isClickable) {
// 	return (<><button onClick={handleClick}> Join button </button><h3><a href={meetingurl}> {meetingurl} </a></h3><h3>{jointime}</h3><h2>{meetingurl}</h2></>
// 		);
// 	// } else {
// 	// 	return <div> no class presently</div>;
// 	// }
// }
// export default JoinButton;

import React, { useState, useEffect } from "react";
import { isWithinInterval, add } from "date-fns";
// import Button from "react-bootstrap/Button";
import "./Joinbutton.css";
// import { Link } from "react-router-dom";

function JoinButton({ meetingurl }) {
	// const navigate = useNavigate;
	const [isClickable, setIsClickable] = useState(false);
	// const [meetingurl, setMeetingUrl] = useState("");
	useEffect(() => {
		const currentTime = new Date();
		const targetTime = new Date();
		targetTime.setHours(13, 50, 0); // set target time to 10:00 AM
		const isAfterClass1Hour = add(targetTime, { hours: 12 });
		setIsClickable(
			isWithinInterval(currentTime, {
				start: targetTime,
				end: isAfterClass1Hour,
			})
		);
		console.log(
			isWithinInterval(currentTime, {
				start: targetTime,
				end: isAfterClass1Hour,
			})
		);
	}, []);

	// async function handleClick() {
	// 	const requestOptions = {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ id: 1 }),
	// 	};

	// const response = await fetch("/api/joinSession", requestOptions);
	// const data = await response.json();
	// setMeetingUrl(data.meetingurl);
	// setJoinTime(data.jointime);
	// navigate("/joinSession");

	// }
	// 	if (isClickable) {
	// 	return (<><button onClick={handleClick}> Join button </button><h3>
	// 		<div><a href={meetingurl}>{meetingurl}</a></div>
	// 		</h3>
	// 		<h3>{jointime}</h3>
	// 		<h2>{meetingurl}</h2></>
	// 	);

	// 	} else {
	// 		return <div> no class presently</div>;
	// 	}
	// }
	// export default JoinButton;
	if (isClickable) {
		return (
			<div>
				<a href={meetingurl}>join</a>
			</div>
		);
	} else {
		return <div> no class presently</div>;
	}
}

export default JoinButton;
