import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
	UnlockOutlined,
	UserOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import './index.css'
import { withRouter } from 'react-router-dom'

const { Sider } = Layout;


function SideMenu(props) {

	const [collapsed] = useState(false);

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
		getItem('首页', '/home', <HomeOutlined />),
		getItem('用户管理', '/user-manage', <UserOutlined />, [
			getItem('用户列表', '/user-manage/list')
		]),
		getItem('权限管理', '/right-manage', <UnlockOutlined />, [
			getItem('角色列表', '/right-manage/role/list'),
			getItem('权限列表', '/right-manage/right/list'),
		])
	];

	// items.push(getItem('首11页', '/hom11e', <HomeOutlined />))

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo">全球新闻发布管理系统</div>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} onClick={(obj) => {
				props.history.push(obj.key)
			}} />
		</Sider>
	);
}

export default withRouter(SideMenu);