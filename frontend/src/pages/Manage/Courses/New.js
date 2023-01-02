import { http } from '@/utils'
import {
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  PageHeader,
  Radio,
  Space,
} from 'antd'
import { useState } from 'react'

const CoursesNew = ({ getDataFromForm }) => {
  const [value, setValue] = useState(1)
  const radoiOnChange = (e) => {
    setValue(e.target.value)
  }
  const onFinish = (values) => {
    // console.log('Success:', values)
    let data = new FormData()
    data.append('name', values.name)
    data.append('credit', values.credit)
    data.append('duration', values.duration)
    data.append('capacity', values.capacity)
    data.append('campus', values.campus)
    data.append('courseType', values.courseType)
    reqNewCourse(data)
  }
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  const reqNewCourse = async (data) => {
    let url = 'http://localhost:8080/api/v1/courses/Add'
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
      <PageHeader className="site-page-header" title="新建课程" />
      <Form
        preserve={false}
        id="newCourse"
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
            label="CourseType"
            name="courseType"
            rules={[
              {
                required: true,
                message: 'Please select courseType!',
              },
            ]}
          >
            <Radio.Group onChange={radoiOnChange} value={value}>
              <Radio value={0}>专业课</Radio>
              <Radio value={1}>通识选修课</Radio>
              <Radio value={2}>公共基础课</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Campus"
            name="campus"
            rules={[
              {
                required: true,
                message: 'Please select campus!',
              },
            ]}
          >
            <Radio.Group onChange={radoiOnChange} value={value}>
              <Radio value={0}>campus1</Radio>
              <Radio value={1}>campus2</Radio>
              <Radio value={2}>campus3</Radio>
            </Radio.Group>
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
            label="credit"
            name="credit"
            rules={[
              {
                required: true,
                message: 'Please input credit!',
              },
            ]}
          >
            <InputNumber placeholder="credit" />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[
              {
                required: true,
                message: 'Please input duration!',
              },
            ]}
          >
            <InputNumber placeholder="duration" />
          </Form.Item>
          <Form.Item
            label="capacity"
            name="capacity"
            rules={[
              {
                required: true,
                message: 'Please input capacity!',
              },
            ]}
          >
            <InputNumber placeholder="capacity" />
          </Form.Item>
        </Space>
      </Form>
    </Layout>
  )
}
export default CoursesNew
