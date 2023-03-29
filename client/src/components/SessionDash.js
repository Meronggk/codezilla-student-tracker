/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import { Layout, Menu, Grid } from "antd";
import {
	UserOutlined,
	PlusOutlined,
	FormOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import NewSession from "./NewSession";
import NewSessionData from "./NewSessionData";
import AttendenceForm from "./AttendenceForm";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import RegisterUser from "./RegisterUser";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const SessionDash = () => {
	const screens = useBreakpoint();

	const [selectedKey, setSelectedKey] = React.useState("user-profile");
	// const [role, setRole] = useState("");
	// role: role,

	const handleMenuClick = (e) => {
		setSelectedKey(e.key);
	};

	const getItemIcon = (item) => {
		switch (item) {
			case "User-profile":
				return <UserOutlined />;
			case "Add-classes":
				return <PlusOutlined />;
			case "Attendance-form":
				return <FormOutlined />;
			case "Upcoming-classes":
				return <CalendarOutlined />;
			case "Register-user":
				return <PlusOutlined />;
			default:
				return null;
		}
	};

	const renderMenuItem = (item) => {
		return (
			<Menu.Item key={item} icon={getItemIcon(item)}>
				<Link to={item}> {item.replace(/-/g, " ")} </Link>
			</Menu.Item>
		);
	};

	const contentStyle = {
		flex: 1,
		padding: "20px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
	};

	const sidebarStyle = {
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
	};

	return (
		<div style={{ display: "flex" }}>
			<Sider
				width={200}
				collapsedWidth={screens.xs ? 0 : 80}
				style={sidebarStyle}
			>
				<Menu
					mode="inline"
					selectedKeys={[selectedKey]}
					onClick={handleMenuClick}
				>
					{[
						"User-profile",
						"Add-Session",
						"Attendance-form",
						"Upcoming-Sessions",
						"Register-user",
					].map(renderMenuItem)}
					<LogoutButton />
				</Menu>
			</Sider>
			<Routes>
				<Route path="User-profile" element={<Profile />} />

				<Route path="Add-classes" element={<AddClasses />} />

				<Route path="Attendance-form/:sessionId" element={<AttendenceForm />} />
				<Route path="Upcoming-classes" element={<UpcomingClasses />} />

				<Route path="Add-Session" element={<AddClasses />} />

				<Route path="Attendance-form" element={<AttendenceForm />} />
				<Route path="Upcoming-Sessions" element={<NewSessionData />} />
				<Route path="Register-user" element={<RegisterUser />} />
			</Routes>
		</div>
	);
};

const UserProfile = () => {
	return (
		<div>
			<h2>User Profile</h2>
			<Profile />
		</div>
	);
};

const AddClasses = () => {
	return (
		<div>
			<h2>Create Session</h2>
			<NewSession />
		</div>
	);
};

const AttendanceForm = () => {
	return (
		<div>
			<AttendenceForm />
		</div>
	);
};

const UpcomingClasses = () => {
	return (
		<div>
			<NewSessionData />
		</div>
	);
};
const Register_User = () => {
	return (
		<div>
			<h2>RegisterUser</h2>
			<RegisterUser />
		</div>
	);
};

export default SessionDash;
