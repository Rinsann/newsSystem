import React, { useState } from 'react';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
const { Header } = Layout;


function TopHeader(props) {

	const [collapsed, setCoolapsed] = useState(false);
	const changeCollapsed = () => {
		setCoolapsed(!collapsed)
	}

	const menu = (
		<Menu>
			<Menu.Item>超级管理员</Menu.Item>
			<Menu.Item danger>退出登录</Menu.Item>
		</Menu>
	);

	return (
		<Header className="site-layout-background" style={{ padding: '0 16px' }}>
			{
				collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
			}
			<div style={{ float: 'right' }}>
				<span>欢迎 admin 回来</span>
				<Dropdown overlay={menu}>
					<Avatar size="large" icon={<UserOutlined />} />
				</Dropdown>
			</div>
		</Header>
	);
}

export default TopHeader;