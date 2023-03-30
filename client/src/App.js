import { Route, Routes } from "react-router-dom";
import GitHubCalllBack from "./components/GitHubCallBack";
import GitHubLogin from "./components/GitHubLogin";
import Homepage from "./components/Homepage/Homepage";
import NavBar from "./components/Homepage/NavBar";
import AttandanceForm from "./components/AttendenceForm";
import SessionDash from "./components/SessionDash";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import RoleContext from "./components/RoleContext";
import { useState } from "react";


function App() {
	const [role, setRole] = useState("Trainee");
	const context = [role, setRole];

	return (
		<div>
				<Route
					path="/dashboard/:sessionId/attendanceform"
					element={<AttandanceForm />}
				/>
			<RoleContext.Provider value={context}>
				<NavBar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<GitHubLogin />} />
					<Route path="/callback" element={<GitHubCalllBack />} />
					<Route path="/homepage" element={<Homepage />} />
					<Route path="/dashboard" element={<SessionDash />} />
					<Route path="/footer" element={<Footer />} />
				</Routes>
				<Footer />
			</RoleContext.Provider>

		</div>
	);
}

export default App;
