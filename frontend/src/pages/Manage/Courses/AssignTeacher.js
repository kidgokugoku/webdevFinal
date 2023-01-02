import { http } from '@/utils'
import {
  Form,
  Input,
  Layout,
  message,
  PageHeader,
  Space,
  Table,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'

const { Search } = Input

const AssignTeacher = ({ getDataFromForm, courseId }) => {
  const [data, setData] = useState()

  const assign = async (data) => {
    let formdata = new FormData()
    formdata.append('courseId', courseId)
    formdata.append('teacherId', data.uid)
    let url = 'http://localhost:8080/api/v1/selections/TeacherSelect'
    const res = await http.post(url, formdata)
    getDataFromForm(res.data.state)
    if (res.data.state === 200) {
      message.success(`成功添加`)
      window.location.reload()
    } else {
      message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
    }
  }

  const onSearch = async (value) => {
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
      return setData(users)
    } else {
      message.error(`error code:${res.data.state} message:${res.data.message}`)
      return []
    }
  }
  const [loading, setLoading] = useState(false)

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
      title: 'operation',
      key: 'operation',
      fixed: 'right',
      // @ts-ignore
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => assign(record)}>
            assign
          </Typography.Link>
        )
      },
    },
  ]
  return (
    <Layout>
      <PageHeader className="site-page-header" title="分配老师" />
      <Form
        preserve={false}
        id="AssignTeacher"
        name="basic"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Space
          direction="vertical"
          size="large"
          style={{ display: 'flex' }}
          align="center"
        >
          <Search placeholder="User's name" onSearch={onSearch}></Search>
          <Table
            size="small"
            columns={columns}
            dataSource={data}
            loading={loading}
          ></Table>
        </Space>
      </Form>
    </Layout>
  )
}
export default AssignTeacher
