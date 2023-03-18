import React from "react";

function JoinButton() {

function handleClick(){
		fetch("/api/getZoomMeeting/1")
			.then((response) => response.json())
			.then((data) => {
				console.log(data.meeting_url);
			});
}

	return (
		<button onClick={handleClick}>
			join button
		</button>
	);
}

export default JoinButton;

i