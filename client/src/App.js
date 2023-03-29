import { Route, Routes } from "react-router-dom";
import GitHubCalllBack from "./components/GitHubCallBack";
import GitHubLogin from "./components/GitHubLogin";
import Login from "./components/Login";
import Homepage from "./components/Homepage/Homepage";
import NavBar from "./components/Homepage/NavBar";
import AttendenceForm from "./components/AttendenceForm";
import SessionDash from "./components/SessionDash";
import NewSession from "./components/NewSession";
import LogoutButton from "./components/LogoutButton";
import JoinButton from "./components/JoinButton";
import Profile from "./components/Profile";
import RegisterUser from "./components/RegisterUser";
import Footer from "./components/Footer";
// import About_us from "./components/About_us";
import NewSessionData from "./components/NewSessionData";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				{/* <Route path="/about" element={<About_us />} /> */}
				<Route path="/login" element={<GitHubLogin />} />
				<Route path="/callback" element={<GitHubCalllBack />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/homepage" element={<Homepage />} />
				<Route path="/sessiondata" element={<NewSessionData />} />
				<Route path="/dashboard/*" element={<SessionDash />} />
				<Route path="/sessions" element={<NewSession />} />
				<Route path="/logout" element={<LogoutButton />} />
				<Route path="/join" element={<JoinButton />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route path="/attendenceForm" element={<AttendenceForm />} />
				<Route path="/footer" element={<Footer />} />
			</Routes>
		</div>
	);
}

export default App;
