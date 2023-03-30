/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
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
import RoleContext from "./RoleContext";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const SessionDash = () => {
	const [role] = useContext(RoleContext);
	console.log(role);
	const screens = useBreakpoint();

	const [selectedKey, setSelectedKey] = React.useState("user-profile");

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

	let siderContent;
	if (role === "Trainee") {
		siderContent = (
			<Menu
				mode="inline"
				selectedKeys={[selectedKey]}
				onClick={handleMenuClick}
			>
				{["User-profile", "Upcoming-classes"].map(renderMenuItem)}
				<LogoutButton />
			</Menu>
		);
	} else {
		siderContent = (
			<Menu
				mode="inline"
				selectedKeys={[selectedKey]}
				onClick={handleMenuClick}
			>
				{[
					"User-profile",
					"Add-classes",
					"Attendance-form",
					"Upcoming-classes",
					"Register-user",
				].map(renderMenuItem)}

				<LogoutButton />
			</Menu>
		);
	}

	return (
		<div style={{ display: "flex" }}>
			<Sider
				width={200}
				collapsedWidth={screens.xs ? 0 : 80}
				style={sidebarStyle}
			>

				<h1 style={{ fontFamily: "serif" }}>{role}</h1>
				{siderContent}

			</Sider>
			<Routes>
				<Route path="User-profile" element={<Profile />} />
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
			<RegisterUser />
		</div>
	);
};

export default SessionDash;
