import React, { useState, useEffect } from "react";

const teamMembers = [
	{
		id: 1,
		name: "Fatih",
		position: "Full-Stack Developer",
		linkedin: "https://www.linkedin.com/in/fatih-celebi-5460a4229/",
		image: require("./Homepage/assets/images/Fatih.png"),
	},
	{
		id: 2,
		name: "Shimen",
		position: "Full-Stack Developer",
		linkedin: "https://www.linkedin.com/in/shimenafshar/",
		image: require("./Homepage/assets/images/Shimen.png"),
	},
	{
		id: 3,
		name: "Meron",
		position: "Full-Stack Developer",
		linkedin: "https://www.linkedin.com/in/meron-gebremichael-8531b2243/",
		image: require("./Homepage/assets/images/Meron.png"),
	},
	{
		id: 4,
		name: "Mohammad",
		position: "Full-Stack Developer",
		linkedin: "https://www.linkedin.com/in/mohammadreza-nafar-669507239/",
		image: require("./Homepage/assets/images/Mohammed.png"),
	},

	{
		id: 5,
		name: "Katie",
		position: "Product Manager",
		image: require("./Homepage/assets/images/Katie.png"),
	},
	{
		id: 6,
		name: "Raj",
		position: "TA",
		image: require("./Homepage/assets/images/Raj.png"),
	},
	{
		id: 7,
		name: "Emily",
		position: "TA",
		image: require("./Homepage/assets/images/Emily.jpg"),
	},
];

function About_us() {
	const [showMembers, setShowMembers] = useState(false);
	const [showProject, setShowProject] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowMembers(true);
		}, 2000);
	}, []);

	useEffect(() => {
		if (showMembers) {
			setTimeout(() => {
				setShowProject(true);
			}, 2000);
		}
	}, [showMembers]);

	return (
		<div
			style={{
				backgroundColor: "darkgrey",
				minHeight: "100vh",
				color: "black",
			}}
			className="about_cont"
		>
			<div style={{ padding: "20px", color: "black" }}>
				<h1 style={{ textAlign: "center", color: "black" }}>Meet the team</h1>
				<p style={{ textAlign: "center", fontSize: "25px", color: "black" }}>
					Codezilla Group
				</p>
			</div>

			{showMembers && (
				<div
					style={{ display: "flex", justifyContent: "center", color: "black" }}
				>
					{teamMembers.map((member) => (
						<div
							key={member.id}
							style={{ textAlign: "center", margin: "15px", color: "black" }}
						>
							<img
								src={member.image.default}
								alt={member.name}
								style={{
									width: "150px",
									height: "150px",
									borderRadius: "5%",
									color: "black",
								}}
							/>
							<h3>
								<a
									href={member.linkedin}
									target="_blank"
									rel="noopener noreferrer"
								>
									{member.name}
								</a>
							</h3>
							<p style={{ color: "black" }}>{member.position}</p>
						</div>
					))}
				</div>
			)}

			{showProject && (
				<>
					<h2
						style={{ textAlign: "center", marginTop: "30px", color: "black" }}
					>
						OUR PROJECT
					</h2>
					<p style={{ textAlign: "center", color: "black", fontSize: "28px" }}>
						Class Register
					</p>
				</>
			)}
		</div>
	);
}

export default About_us;
