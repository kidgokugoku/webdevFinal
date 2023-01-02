import { useStore } from '@/store'
import { DiffOutlined, LogoutOutlined } from '@ant-design/icons'
import { Layout, Menu, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
const { Header, Sider } = Layout

const IndexLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [reload, setReload] = useState(0)
  const { loginStore } = useStore()
  const location = useLocation()
  const selectedKey = location.pathname
  const navigate = useNavigate()
  const onLogout = () => {
    loginStore.logout()
    navigate('/login')
  }

  const [items, setItems] = useState([])
  const { userStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo().then(() => setReload(reload + 1))
  }, [])
  useEffect(() => {
    const tmp =
      userStore.userInfo.userType === 0
        ? [
            {
              label: '管理数据',
              key: '/manage',
              icon: <DiffOutlined />,
              type: 'group',
              children: [
                {
                  label: <Link to="/manage/users">用户</Link>,
                  key: '/manage/users',
                },
                {
                  label: <Link to="/manage/courses">课程</Link>,
                  key: '/manage/courses',
                },
              ],
            },
          ]
        : [
            {
              label: '选课',
              key: '/selection',
              icon: <DiffOutlined />,
              children: [
                {
                  label: <Link to="/selection/course">选择课程</Link>,
                  key: '/selection/course',
                },
                {
                  label: <Link to="/selection/now">当前课程</Link>,
                  key: '/selection/now',
                },
              ],
            },
          ]
    setItems(tmp)
  }, [reload])

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.username}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[selectedKey]}
            items={items}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default IndexLayout
