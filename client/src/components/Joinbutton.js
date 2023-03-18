import React, { useState, useEffect } from "react";
import { isWithinInterval, add } from "date-fns";
// import Button from "react-bootstrap/Button";
import "./Joinbutton.css";

function JoinButton() {
	const [isClickable, setIsClickable] = useState(false);
	useEffect(() => {
		const currentTime = new Date();
		const targetTime = new Date();
		targetTime.setHours(15, 50, 0); // set target time to 10:00 AM
		const isAfterClass1Hour = add(targetTime,{ hours:1,minutes:10 });
		setIsClickable(isWithinInterval(currentTime,{ start:targetTime,end:isAfterClass1Hour }));
		console.log(isWithinInterval(currentTime, { start: targetTime, end: isAfterClass1Hour }));
		// console.log(targetTime);
		// const timeDifference = targetTime.getTime() - currentTime.getTime();
		// const isAfterTargetTime = timeDifference < 0;
		// const isBefore10Mins = timeDifference > -10 * 60 * 1000; // 10 mins before target time
		// if (isAfterTargetTime || !isBefore10Mins) {
		// 	setIsClickable(false);
		// 	return;
		// }
		// const intervalId = setInterval(() => {
		// 	setIsClickable(true);
		// }, timeDifference);
		// return () => clearInterval(intervalId);
	}, []);
	function handleClick() {
		fetch("/api/getZoomLink/1")
			.then((response) => response.json())
			.then((data) => {
				console.log(data.meeting_url);
			});
	}
	if (isClickable){
		return(
			<button onClick={handleClick}> Join button </button>
		);
	}else {
		return(
			<div> no class presently</div>
		);
	}
}
export default JoinButton;
