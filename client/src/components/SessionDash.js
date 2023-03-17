import {
	UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import "./SessionDash.css";



const { Header, Content, Footer, Sider } = Layout;

const SessionDash = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["4"]}
					items={[
						UserOutlined,


					].map((icon, index) => ({
						key: String(index),
						icon: React.createElement(icon),
						label: `create classes ${index[0]}`,
                        label1: `attendance form ${index[1]}`,
					}))}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				/>
				<Content
					style={{
						margin: "24px 16px 0",
					}}
				>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						}}
					>
						content
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
 Created by codezilla
				</Footer>
			</Layout>
		</Layout>
	);
};
export default SessionDash;
