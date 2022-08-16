import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import './index.css'

const { Sider } = Layout;


function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const items = [
	getItem('首页', '/home', <PieChartOutlined />),
	getItem('用户管理', '/user-manage', <DesktopOutlined />, [
		getItem('用户列表', '/user-manage/list')
	]),
	getItem('权限管理', '/right-manage', <MailOutlined />, [
		getItem('角色列表', '/right-manage/role/list'),
		getItem('权限列表', '/right-manage/right/list'),
	])
];


function SideMenu(props) {
	const [collapsed] = useState(false);
	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo">全球新闻发布管理系统</div>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />

		</Sider>
	);
}

export default SideMenu;