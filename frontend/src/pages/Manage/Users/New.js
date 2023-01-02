import { http } from '@/utils'
import { Form, Input, Layout, message, PageHeader, Radio, Space } from 'antd'
import { useState } from 'react'

const UsersNew = ({ getDataFromForm }) => {
  const [value, setValue] = useState(1)
  const radoiOnChange = (e) => {
    setValue(e.target.value)
  }
  const onFinish = (values) => {
    // console.log('Success:', values)
    let data = new FormData()
    data.append('username', values.username)
    data.append('password', values.password)
    data.append('name', values.name)
    data.append('userType', values.userType)
    reqNewUser(data)
  }
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  const reqNewUser = async (data) => {
    let url = 'http://localhost:8080/api/v1/users/Reg'
    const res = await http.post(url, data)
    getDataFromForm(res.data.state)
    if (res.data.state === 200) {
      message.success(`成功添加`)
      window.location.reload()
    } else {
      message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
    }
  }

  return (
    <Layout>
      <PageHeader className="site-page-header" title="新建用户" />
      <Form
        preserve={false}
        id="newUser"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Space
          direction="vertical"
          size="large"
          style={{ display: 'flex' }}
          align="center"
        >
          <Form.Item
            label="UserType"
            name="userType"
            rules={[
              {
                required: true,
                message: 'Please select your userType!',
              },
            ]}
          >
            <Radio.Group onChange={radoiOnChange} value={value}>
              <Radio value={0}>管理员</Radio>
              <Radio value={1}>学生</Radio>
              <Radio value={2}>教师</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
        </Space>
      </Form>
    </Layout>
  )
}
export default UsersNew
