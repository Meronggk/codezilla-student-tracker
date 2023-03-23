import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GitHubCalllBack from "./components/GitHubCallBack";
import GitHubLogin from "./components/GitHubLogin";
import Login from "./components/Login";
import Homepage from "./components/Homepage/Homepage";
import NavBar from "./components/Homepage/NavBar";
import AttendenceForm from "./components/AttendenceForm";
import SessionData from "./components/SessionData";
import SessionDash from "./components/SessionDash";
import NewSession from "./components/NewSession";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import RegisterUser from "./components/RegisterUser";
import Footer from "./components/Footer";

function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<GitHubLogin></GitHubLogin>} />
				<Route path="/callback" element={<GitHubCalllBack />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/attendenceForm" element={<AttendenceForm />} />
				<Route path="/homepage" element={<Homepage />} />
				<Route path="/sessiondata" element={<SessionData />} />
				<Route path="/dashboard" element={<SessionDash />} />
				<Route path="newsession" element={<NewSession />} />
				<Route path="/sessions" element={<NewSession />} />
				<Route path="/logout" element={<LogoutButton />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route path="/footer" element={<Footer />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
