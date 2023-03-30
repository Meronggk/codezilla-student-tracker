import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import RoleContext from "./RoleContext";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

//import JoinButton from "./JoinButton";

const SingleSession = ({ sessionData }) => {
	const meeting_url = `/api/joinSession/${sessionData.id}`;
	let formLink = null;
	const [role] = useContext(RoleContext);
	console.log(role);

	const todayEnd = new Date().setHours(23, 59, 59, 59);
	const todayStart = new Date().setHours(0, 0, 0, 0);
	const time = new Date(sessionData.time);

	if (role === "Volunteer") {
		formLink = (
			<Link to={`/dashboard/${sessionData.id}/attendanceform`}>
				<Button variant="primary">Attendance Form</Button>
			</Link>
		);
	}
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>{sessionData.name}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{sessionData.time}
				</Card.Subtitle>
				{time < todayEnd && time > todayStart ? (
					<Card.Link href={meeting_url}>Join</Card.Link>
				) : (
					<span>Link not available yet</span>
				)}
				<br />
				{formLink}
			</Card.Body>
			{/* <JoinButton /> */}
		</Card>
	);
};

export default SingleSession;
