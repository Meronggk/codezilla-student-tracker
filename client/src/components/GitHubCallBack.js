import React, { useEffect } from "react";
//import GitHubLogin from "../components/GitHubLogin";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const GitHubCalllBack = () => {
	// const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	// searchParams.get();
	console.log(searchParams);
	console.log(setSearchParams);

	const paramCode = searchParams.get("code");
	console.log(paramCode);

	function LoginUser() {
		axios.post("/api/callback", { log: paramCode }).then(() => {
			//  navigate("/");
		});
	}
	useEffect(() => {
		LoginUser();
	});

	return <div>loading</div>;
};


export default GitHubCalllBack;
