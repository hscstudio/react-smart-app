import React from 'react'
// import { useShared } from 'store'
import { Divider, Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  UserAddOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import useAuth from 'hooks/use-auth'

// const { SubMenu } = Menu

function LeftMenu () {
  const { isGuest } = useAuth()
  const menus = [
    { path: '/home', icon: <HomeOutlined />, title: 'Home' },
    { path: '/login', icon: <LoginOutlined />, title: 'Login', auth: false },
    { path: '/signup', icon: <UserAddOutlined />, title: 'Signup', auth: false },
    { path: '/posts', icon: <UnorderedListOutlined />, title: 'Post', auth: true },
    { path: '/account', icon: <UserOutlined />, title: 'Account', auth: true },
    { path: '/about', icon: <InfoCircleOutlined />, title: 'About' }
  ]
  return <div className="left-menu">
    {/* <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <UserOutlined />
            <span>Navigation One</span>
          </span>
        }
      >
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu> */}
    <hr />
    <Menu
      mode="inline"
      defaultSelectedKeys={['/']}
      selectedKeys={[window.location.pathname]}>
      {menus.map(menu => {
        if (menu.auth && isGuest) {
          // blank
          return ''
        } else if (menu.auth === false && isGuest === false) {
          // blank
          return ''
        } else {
          return (<Menu.Item key={menu.path}>
            <Link to={menu.path}>
              {menu.icon} {menu.title}
            </Link>
          </Menu.Item>)
        }
      })}
    </Menu>
    <Divider />
  </div>
}

export default LeftMenu
