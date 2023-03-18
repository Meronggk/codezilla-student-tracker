import React, { useState, useEffect } from "react";
function JoinButton() {
	const [isClickable, setIsClickable] = useState(false);
	useEffect(() => {
		const currentTime = new Date();
		const targetTime = new Date();
		targetTime.setHours(10, 0, 0); // set target time to 10:00 AM
		const timeDifference = targetTime.getTime() - currentTime.getTime();
		const isAfterTargetTime = timeDifference < 0;
		const isBefore10Mins = timeDifference > -10 * 60 * 1000; // 10 mins before target time
		if (isAfterTargetTime || !isBefore10Mins) {
			setIsClickable(false);
			return;
		}
		const intervalId = setInterval(() => {
			setIsClickable(true);
		}, timeDifference);
		return () => clearInterval(intervalId);
	}, []);
	function handleClick() {
		console.log('test')
		fetch("/api/getZoomMeeting/1")
			.then((response) => response.json())
			.then((data) => {
				console.log(data.meeting_url);
			});
	}
	return (
		<button onClick={handleClick} disabled={!isClickable}>
			join button
		</button>
	);
}
export default JoinButton;


