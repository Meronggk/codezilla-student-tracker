import React from "react";
import Card from "react-bootstrap/Card";
//import JoinButton from "./JoinButton";

const SingleSession = ({ sessionData }) => {
	const todayEnd = new Date().setHours(23, 59, 59, 59);
	const todayStart = new Date().setHours(0, 0, 0, 0);
	const time = new Date(sessionData.time);
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>{sessionData.name}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{sessionData.time}
				</Card.Subtitle>
				{time < todayEnd && time > todayStart ? (
					<Card.Link href={sessionData.meeting_url}>Join</Card.Link>
				) : (
					<span>Link not available yet</span>
				)}
			</Card.Body>
			{/* <JoinButton /> */}
		</Card>
	);
};

export default SingleSession;
