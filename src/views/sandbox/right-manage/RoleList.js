import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Tree } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal
export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [rightList, setrightList] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const columns = [{
    title: 'ID', dataIndex: 'id', render: (id) => {
      return <b>{id}</b>
    }
  }, {
    title: '角色名称', dataIndex: 'roleName',
  }, {
    title: '操作', render: (item) => {
      return <div>
        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
          setIsModalVisible(true)
          setCurrentRights(item.rights)
          setCurrentId(item.id)
        }
        } />
      </div>
    }
  }]
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then(res => {
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then(res => {
      setrightList(res.data)
    })
  }, [])

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
    axios.delete(`http://localhost:8000/roles/${item.id}`)
  }

  const handleOk = () => {
    // 同步DataSource
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return { ...item, rights: currentRights }
      }
      return item
    }))
    axios.patch(`http://localhost:8000/roles/${currentId}`, {
      rights: currentRights
    })
    setIsModalVisible(false)

  }

  const handleCancel = () => {
    setIsModalVisible(false)

  }

  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked)
  };


  return (<div>
    <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}></Table>
    <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Tree
        checkable
        checkedKeys={currentRights}
        onCheck={onCheck}
        checkStrictly={true}
        treeData={rightList}
      />
    </Modal>
  </div>)
}
