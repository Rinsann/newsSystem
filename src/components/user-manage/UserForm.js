import React, { forwardRef, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd'

const { Option } = Select

const UserForm = forwardRef((props, ref) => {
	const { roleList, regionList ,isUpdateDisabled} = props
	const [isDisabled, setIsDisabled] = useState(false)

	useEffect(()=>{
		setIsDisabled(isUpdateDisabled)
	},[isUpdateDisabled])
	return (
		<Form layout="vertical" ref={ref}>
			<Form.Item name="username" label="用户名"
			           rules={[{
				           required: true,
				           message: 'Please input the title of collection!',
			           },]}><Input /></Form.Item>
			<Form.Item name="password" label="密码"
			           rules={[{
				           required: true,
				           message: 'Please input the title of collection!',
			           },]}><Input /></Form.Item>
			<Form.Item name="region" label="区域"
			           rules={isDisabled ? [] : [{
				           required: true,
				           message: 'Please input the title of collection!',
			           },]}>
				<Select disabled={isDisabled}>
					{
						regionList.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)
					}
				</Select>
			</Form.Item>
			<Form.Item name="roleId" label="角色"
			           rules={[{
				           required: true,
				           message: 'Please input the title of collection!',
			           },]}>
				<Select onChange={(value) => {
					if (value === 1) {
						setIsDisabled(true)
						ref?.current.setFieldsValue({
							region: ''
						})
					} else {
						setIsDisabled(false)
					}
				}}>
					{
						roleList.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)
					}
				</Select>
			</Form.Item>
		</Form>
	);
})

export default UserForm;