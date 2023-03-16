import { Route, Routes } from "react-router-dom";
import GitHubCalllBack from "./components/GitHubCallBack";
// import GitHubLogin from "./components/GitHubLogin";
import Login from "./components/Login";
import About from "./pages/About";
import Home from "./pages/Home";


function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/this/site" element={<About />} />
				{/* <Route path="/login" element={<GitHubLogin></GitHubLogin>} /> */}
				<Route path="/callback" element={<GitHubCalllBack />} />

			</Routes>
		</div>
	);
}

export default App;
