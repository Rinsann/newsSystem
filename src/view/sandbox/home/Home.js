import React from 'react';
import { Button } from 'antd'
// import axios from 'axios'

function Home(props) {
	const ajax = () => {
		/* axios.get('http://localhost:9000/roles?id=1').then(res => {
		 console.log(res.data)
		 }) */
	/* 	axios.post('http://localhost:9000/roles', {
			id: 7990,
			username: '5dshufhdsui',
			password: 12343356,
			roleState: false,
			default: true,
			region: '',
			roleId: 7990
		}).then(r => {
			console.log(r)
		}) */
	//	put 修改时直接替换整个，不方便修改部分字段
	//	patch 更新补丁不受影响的字段不修改
	//	删除 delete
	}
	return (
		<div>
			<Button type="primary" onClick={ajax}>Button</Button>
		</div>
	);
}

export default Home;