import { http } from '@/utils'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import Search from 'antd/lib/input/Search'
import { useEffect, useState } from 'react'
import UsersNew from './New'

const changeOnclick = (row) => {}
const deleteOnclick = async (uid) => {
  let data = new FormData()
  data.append('uid', uid)
  const res = await http.post('http://localhost:8080/api/v1/users/Delete', data)
  if (res.data.state === 200) {
    message.success(`成功删除`)
    window.location.reload()
  } else {
    message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
  }
}

const getUserInfo = async () => {
  const res = await http.get('http://localhost:8080/api/v1/users/GetAll')
  if (res.data.state === 200) {
    let users = res.data.data
    users.forEach((user) => {
      user.key = user.uid
    })
    return users
  } else {
    message.error(`error code:${res.data.state} message:${res.data.message}`)
    return []
  }
}

const Users = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [dataUpdateCounter, setDataUpdateCounter] = useState(0)

  useEffect(() => {
    setLoading(true)
    try {
      getUserInfo().then((users) => {
        setData(users)
        setLoading(false)
      })
    } catch {}
  }, [dataUpdateCounter])

  const [resState, setResState] = useState('')

  const getDataFromForm = (dataFromForm) => {
    setResState(dataFromForm)
  }

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const newOnclick = () => {
    setOpen(true)
  }

  const onNameSearch = async (value) => {
    let data = new FormData()
    data.append('name', value)
    const res = await http.post(
      'http://localhost:8080/api/v1/users/GetByName',
      data
    )
    if (res.data.state === 200) {
      let users = res.data.data
      users.forEach((user) => {
        user.key = user.uid
      })
      setData(users)
      return
    } else {
      message.error(`error code:${res.data.state} message:${res.data.message}`)
      return []
    }
  }
  useEffect(() => {
    if (resState === '200') {
      setConfirmLoading(false)
      setOpen(false)
    } else {
      setConfirmLoading(false)
    }
  }, [resState, confirmLoading])

  const handleOk = () => {
    setConfirmLoading(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === 'number' ? (
        <InputNumber />
      ) : inputType === 'text' ? (
        <Input />
      ) : (
        <Select
          options={[
            {
              value: 0,
              label: 'admin',
            },
            {
              value: 1,
              label: 'student',
            },
            {
              value: 2,
              label: 'teacher',
            },
          ]}
        />
      )
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      reqEditUser({ ...row, uid: editingKey })
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setLoading(true)
        setEditingKey('')
      } else {
        newData.push(row)
        setLoading(true)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const cancel = () => {
    setEditingKey('')
  }
  const reqEditUser = async (rawData) => {
    console.log(rawData)
    let data = new FormData()
    data.append('uid', rawData.uid)
    data.append('name', rawData.name)
    data.append('username', rawData.username)
    data.append('password', rawData.password)
    data.append('userType', rawData.userType)
    let url = 'http://localhost:8080/api/v1/users/Edit'
    const res = await http.post(url, data)
    if (res.data.state === 200) {
      message.success(`成功修改`)
      setDataUpdateCounter(dataUpdateCounter + 1)
    } else {
      message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
      setDataUpdateCounter(dataUpdateCounter + 1)
    }
  }

  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      editable: true,
    },
    {
      title: 'UserType',
      dataIndex: 'userType',
      key: 'userType',
      editable: true,
      filters: [
        {
          text: 'admin',
          value: 0,
        },
        {
          text: 'student',
          value: 1,
        },
        {
          text: 'teacher',
          value: 2,
        },
      ],
      filteredValue: filteredInfo.userType || null,
      onFilter: (value, record) => record.userType === value,
      render: (_, { userType }) => {
        const color =
          userType === 0 ? 'volcano' : userType === 1 ? 'green' : 'geekblue'
        const text =
          userType === 0 ? 'admin' : userType === 1 ? 'student' : 'teacher'
        return (
          <Tag color={color} key={userType}>
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'CreatedTime',
      dataIndex: 'createdTime',
      key: 'createdTime',
      sorter: (a, b) => (a.createdTime < b.createdTime ? 1 : -1),
      sortOrder:
        sortedInfo.columnKey === 'createdTime' ? sortedInfo.order : null,
      render: (_, { createdTime }) => {
        return new Date(createdTime).toLocaleDateString('zh-CN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })
      },
    },
    {
      title: 'ModifiedTime',
      dataIndex: 'modifiedTime',
      key: 'modifiedTime',
      sorter: (a, b) => (a.modifiedTime < b.modifiedTime ? 1 : -1),
      sortOrder:
        sortedInfo.columnKey === 'modifiedTime' ? sortedInfo.order : null,
      render: (_, { modifiedTime }) => {
        return new Date(modifiedTime).toLocaleDateString('zh-CN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })
      },
    },
    {
      title: 'CreatedUser',
      dataIndex: 'createdUser',
      key: 'createdUser',
    },
    {
      title: 'ModifiedUser',
      dataIndex: 'modifiedUser',
      key: 'modifiedUser',
    },
    {
      title: 'operation',
      key: 'operation',
      fixed: 'right',
      // @ts-ignore
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => deleteOnclick(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Typography.Link disabled={editingKey !== ''}>
                delete
              </Typography.Link>
            </Popconfirm>
          </span>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'userType' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Layout>
      <Space align="end">
        <Button onClick={newOnclick}>new</Button>
        <Modal
          destroyOnClose={true}
          title="New user"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{
            form: 'newUser',
            key: 'submit',
            htmlType: 'submit',
          }}
          pagination={{
            onChange: cancel,
          }}
        >
          <UsersNew getDataFromForm={getDataFromForm} />
        </Modal>
        <Search
          type="search"
          placeholder="user's Name"
          onSearch={onNameSearch}
        ></Search>
      </Space>
      <Divider type="vertical" />
      <Form form={form} component={false}>
        <Table
          size="small"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          onChange={handleChange}
          columns={mergedColumns}
          dataSource={data}
          loading={loading}
          rowClassName="editable-row"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            defaultPageSize: 100,
            position: ['topRight', 'bottomRight'],
            onChange: cancel,
          }}
        ></Table>
      </Form>
    </Layout>
  )
}
export default Users
