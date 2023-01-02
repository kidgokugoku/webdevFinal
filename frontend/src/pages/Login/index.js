import logo from '@/assets/oucLogo.jpg'
import { useStore } from '@/store'
import { Button, Card, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const onFinish = (values) => {
  console.log(values)
}

const Login = () => {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async (values) => {
    const { username, password } = values
    loginStore
      .login({ username, password })
      .then(() => {
        navigate('/')
      })
      .catch((e) => {
        message.error(e || '登录失败')
      })
  }
  return (
    <div className="login">
      <Card className="login-container">
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            style={{
              width: '60%',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
            src={logo}
          />
        </div>
        <Form
          onFinish={onFinish}
          initialValues={{ username: 'admin1', password: '654321' }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
