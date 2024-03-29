import { Route, Routes } from "react-router-dom";
import GitHubCalllBack from "./components/GitHubCallBack";
import GitHubLogin from "./components/GitHubLogin";
import Homepage from "./components/Homepage/Homepage";
import NavBar from "./components/Homepage/NavBar";
import SessionDash from "./components/SessionDash";
import Footer from "./components/Footer";
import About_us from "./components/About_us";
import "bootstrap/dist/css/bootstrap.min.css";
import RoleContext from "./components/RoleContext";
import { useState } from "react";

function App() {
	const [role, setRole] = useState("Trainee");
	const context = [role, setRole];

	return (
		<div>
			<RoleContext.Provider value={context}>
				<NavBar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About_us />} />
					<Route path="/login" element={<GitHubLogin />} />
					<Route path="/callback" element={<GitHubCalllBack />} />
					<Route path="/dashboard/*" element={<SessionDash />} />
					<Route path="/footer" element={<Footer />} />
				</Routes>
				<Footer />
			</RoleContext.Provider>
		</div>
	);
}

export default App;
