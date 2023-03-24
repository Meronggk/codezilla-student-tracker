import React from "react";
import { Layout, Menu, Grid } from "antd";
import {
	UserOutlined,
	PlusOutlined,
	FormOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import NewSession from "./NewSession";

import AttendenceForm from "./AttendenceForm";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const SessionDash = () => {
	const screens = useBreakpoint();

	const [selectedKey, setSelectedKey] = React.useState("user-profile");

	const handleMenuClick = (e) => {
		setSelectedKey(e.key);
	};

	const getItemIcon = (item) => {
		switch (item) {
			case "user-profile":
				return <UserOutlined />;
			case "add-classes":
				return <PlusOutlined />;
			case "attendance-form":
				return <FormOutlined />;
			case "upcoming-classes":
				return <CalendarOutlined />;
			default:
				return null;
		}
	};

	const renderMenuItem = (item) => {
		return (
			<Menu.Item key={item} icon={getItemIcon(item)}>
				{item.replace(/-/g, " ")}
			</Menu.Item>
		);
	};

	const contentStyle = {
		flex: 1,
		padding: "20px",
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		justifyContent: "start",
	};

	const content = (
		<div style={contentStyle}>
			{selectedKey === "user-profile" && <UserProfile />}
			{selectedKey === "add-classes" && <AddClasses />}
			{selectedKey === "attendance-form" && <AttendanceForm />}
			{selectedKey === "upcoming-classes" && <UpcomingClasses />}
		</div>
	);

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
				{screens.xs ? (
					<Menu
						mode="horizontal"
						selectedKeys={[selectedKey]}
						onClick={handleMenuClick}
					>
						{[
							"user-profile",
							"add-classes",
							"attendance-form",
							"upcoming-classes",
						].map(renderMenuItem)}
					</Menu>
				) : (
					<Menu
						mode="inline"
						selectedKeys={[selectedKey]}
						onClick={handleMenuClick}
					>
						{[
							"user-profile",
							"add-classes",
							"attendance-form",
							"upcoming-classes",
						].map(renderMenuItem)}
						<LogoutButton />
					</Menu>
				)}
			</Sider>
			{content}
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
			<h2>Upcoming Classes</h2>
			{/* Insert upcoming classes content here */}
		</div>
	);
};

export default SessionDash;
