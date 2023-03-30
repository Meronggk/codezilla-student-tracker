// import React, { useState, useEffect } from "react";
// import { isWithinInterval, add } from "date-fns";
// // import Button from "react-bootstrap/Button";
// import "./Joinbutton.css";
// // import { Link } from "react-router-dom";

// function JoinButton({ meetingurl }) {
// 	// const navigate = useNavigate;
// 	const [isClickable, setIsClickable] = useState(false);
// 	// const [meetingurl, setMeetingUrl] = useState("");
// 	useEffect(() => {
// 		const currentTime = new Date();
// 		const targetTime = new Date();
// 		targetTime.setHours(13, 50, 0); // set target time to 10:00 AM
// 		const isAfterClass1Hour = add(targetTime, { hours: 12 });
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

// 	// async function handleClick() {
// 	// 	const requestOptions = {
// 	// 		method: "POST",
// 	// 		headers: { "Content-Type": "application/json" },
// 	// 		body: JSON.stringify({ id: 1 }),
// 	// 	};

// 	// const response = await fetch("/api/joinSession", requestOptions);
// 	// const data = await response.json();
// 	// setMeetingUrl(data.meetingurl);
// 	// setJoinTime(data.jointime);
// 	// navigate("/joinSession");

// 	// }
// 	// 	if (isClickable) {
// 	// 	return (<><button onClick={handleClick}> Join button </button><h3>
// 	// 		<div><a href={meetingurl}>{meetingurl}</a></div>
// 	// 		</h3>
// 	// 		<h3>{jointime}</h3>
// 	// 		<h2>{meetingurl}</h2></>
// 	// 	);

// 	// 	} else {
// 	// 		return <div> no class presently</div>;
// 	// 	}
// 	// }
// 	// export default JoinButton;
// 	if (isClickable) {
// 		return (
// 			<div>
// 				<a href={meetingurl}>join</a>
// 			</div>
// 		);
// 	} else {
// 		return <div> no class presently</div>;
// 	}
// }

// export default JoinButton;
