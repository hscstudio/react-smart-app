import React from 'react'
// import { useShared } from 'store'
import { Divider, Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'

function LeftMenu () {
  const menus = [
    { path: '/home', icon: <HomeOutlined />, title: 'Home' },
    { path: '/account', icon: <UserOutlined />, title: 'Account' },
    { path: '/about', icon: <InfoCircleOutlined />, title: 'About' }
  ]
  return <div className="left-menu">
    <Menu
      mode="inline"
      defaultSelectedKeys={['/']}
      selectedKeys={[window.location.pathname]}>
      {menus.map(menu => {
        return (<Menu.Item key={menu.path}>
          <Link to={menu.path}>
            {menu.icon} {menu.title}
          </Link>
        </Menu.Item>)
      })}
    </Menu>
    <Divider />
  </div>
}

export default LeftMenu
