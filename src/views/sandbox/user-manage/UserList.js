import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'

const { confirm } = Modal
export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
  const [current, setCurrent] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:8000/regions').then(res => {
      setRegionList(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then(res => {
      setRoleList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/users?_expand=role').then(res => {
      setDataSource(res.data)
    })
  }, [])


  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => (
          {
            text: item.title,
            value: item.value
          }
        )), {
          text: '全球',
          value: ''
        }
      ],
      onFilter: (value, item) => item.region === value,

      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}
                  disabled={item.default} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default}
                  onClick={() => handleUpdate(item)} />
        </div>
      }
    }
  ];

  const handleUpdate = async(item) => {
    await setIsUpdateVisible(true)
    if (item.roleId === 1) {
      setIsUpdateDisabled(true)
    } else {
      setIsUpdateDisabled(false)

    }
    await updateForm.current.setFieldsValue(item)

    setCurrent(item)
  }

  const handleChange = (item) => {
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`http://localhost:8000/users/${item.id}`, {
      roleState: item.roleState
    })
  }

  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });

  }
  //删除
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:8000/users/${item.id}`)
  }

  const addFormOk = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      addForm.current.resetFields()
      // post到后端生成id在设置datasource，方便后面的删除和更新
      axios.post(`http://localhost:8000/users`, {
        ...value,
        'roleState': true,
        'default': false,
      }).then(res => {
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === value.roleId)[0],
        }])
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const updateFormOk = () => {
    updateForm.current.validateFields().then(value => {
      setIsUpdateVisible(false)
      setDataSource(dataSource.map(item => {
        if (item.id === current.id) {
          return {
            ...item,
            ...value,
            role: roleList.filter(data => data.id === value.roleId)[0],
          }
        }
        return item
      }))
      axios.patch(`http://localhost:8000/users/${current.id}`, value)
    }).catch(err => {console.log(err)})
    setIsUpdateDisabled(!isUpdateDisabled)
  }

  return (
    <div>
      <Button type="primary" onClick={() => {
        setIsAddVisible(true)
      }}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns}
             pagination={{
               pageSize: 5
             }} rowKey={item => item.id} />

      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addFormOk()}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addForm} />
      </Modal>
      <Modal
        visible={isUpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setIsUpdateVisible(false)
          setIsUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => updateFormOk()}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={updateForm} isUpdateDisabled={isUpdateDisabled} />
      </Modal>
    </div>
  )
}
