import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
	const [userData, setUserData] = useState({
		avatarUrl: "",
		userName: "",
		userGithubId: "",
		userGithubUrl: "",
	});

	useEffect(() => {
		fetch("/api/user/me")
			.then((res) => res.json())
			.then((body) => {
				//console.log(body); // add this line
				setUserData({
					avatarUrl: body.avatarUrl,
					userName: body.userName,
					userGithubId: body.userGithubId,
					userGithubUrl: body.userGithubUrl,
				});
			});
	}, []);

	return (
		<div className="profile-container">
			<img src={userData.avatarUrl} alt="Avatar" className="profile-img" />
			<h3>{userData.userName}</h3>
			<a
				href={userData.userGithubUrl}
				target="_blank" // used to open the link in a new browser window
				rel="noopener noreferrer" // added as a Lint fix, improving security
				className="github-btn"
			>
				<img src="/images/github_icon.png" alt="GitHub icon" />
				View Github Profile
			</a>
		</div>
	);
};

export default Profile;
