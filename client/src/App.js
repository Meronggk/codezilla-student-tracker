import { Route, Routes } from "react-router-dom";
import GitHubCalllBack from "./components/GitHubCallBack";
import GitHubLogin from "./components/GitHubLogin";
import Login from "./components/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Homepage from "./components/Homepage/Homepage";
//import NavBar from "./components/Homepage/NavBar";
import Form from "./components/Form";
import SessionDash from "./components/SessionDash";
// import AddClass from "./components/AddClass";
import NewSession from "./components/NewSession";
import LogoutButton from "./components/LogoutButton";
import Profile from "./pages/Profile";

function App() {
	return (
		<div>
			{/**<NavBar /> **/}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/this/site" element={<About />} />
				<Route path="/login" element={<GitHubLogin></GitHubLogin>} />
				<Route path="/callback" element={<GitHubCalllBack />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/homepage" element={<Homepage />} />
				<Route path="/form" element={<Form />} />
				<Route path="/dashboard" element={<SessionDash />} />
				{/* <Route path="/addclass" element={<AddClass />} /> */}
				<Route path="newsession" element={<NewSession />} />
				<Route path="/logout" element={<LogoutButton />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/register" element={<RegisterUser />} />
			</Routes>
		</div>
	);
}

export default App;
