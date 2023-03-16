import { Route, Routes } from "react-router-dom";
import GitHubCalllBack from "./components/GitHubCallBack";
// import GitHubLogin from "./components/GitHubLogin";
import Login from "./components/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

//import { useEffect } from "react";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/this/site" element={<About />} />
				{/* <Route path="/login" element={<GitHubLogin></GitHubLogin>} /> */}
				<Route path="/callback" element={<GitHubCalllBack />} />
				<Route path="/signin" element={<Login></Login>} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</div>
	);
}

export default App;
