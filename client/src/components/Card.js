import React from "react";

const Card = ({ name, role }) => {
	return (
		<div className="card">
			<h2>{name}</h2>
			<p>{role}</p>
		</div>
	);
};

export default Card;
