import React from 'react'
import PropTypes from 'prop-types'
import { Layout as BaseLayout, Row, Col, Button, Drawer, Menu, Dropdown, message as Message } from 'antd'
import {
  MenuFoldOutlined,
  LeftOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { useShared } from 'store'
import useAuth from 'hooks/use-auth'
import LeftMenu from 'components/LeftMenu'
import RightMenu from 'components/RightMenu'
import './index.css'

const { Header, Content, Footer } = BaseLayout

function getPage () {
  let currentPage = 'home'
  if (window.location.pathname.includes('/about')) currentPage = 'about'
  return currentPage
}

function getPrevUrl (currentPage) {
  return (currentPage !== 'home') ? '/home' : ''
}

function Layout ({ children, title, link }) {
  const useGeneral = useShared('general')
  const general = useGeneral[0]
  const { user, isGuest, logout } = useAuth()
  const history = useHistory()

  const authMenu = (
    <Menu>
      <Menu.Item key="1"><Link to="/account"><UserOutlined /> Profile</Link></Menu.Item>
      <Menu.Item key="2"><a href="/" onClick={ (e) => {
        e.preventDefault()
        const response = logout()
        Message.success(response.message)
      }}><LogoutOutlined /> Logout</a></Menu.Item>
    </Menu>
  )

  const currentPage = getPage()
  const mainPages = ['home']
  const prevUrl = getPrevUrl(currentPage)
  const [drawer, setDrawer] = React.useState({ visible: false })

  return (
    <BaseLayout className="BaseLayout">
      <Header>
        <Row >
          <Col flex="35px" className="text-center">
            {(mainPages.includes(currentPage))
              ? <Button className="toolbar-btn" type="link" icon={<MenuFoldOutlined />} onClick={() => {
                setDrawer({
                  title: 'Main Menu',
                  placement: 'left',
                  visible: true
                })
              }} />
              : (prevUrl !== '')
                ? <Button className="toolbar-btn" type="link" icon={<LeftOutlined />} onClick={() => history.push(prevUrl)} />
                : (general.prevUrl !== '')
                  ? <Button className="toolbar-btn" type="link" icon={<LeftOutlined />} onClick={() => history.push(general.prevUrl)} />
                  : <Button className="toolbar-btn" type="link" icon={<LeftOutlined />} onClick={() => history.push('/home')} />
            }
          </Col>
          <Col flex="auto">
            <h2 onClick={() => history.push('/home')} >{title}</h2>
          </Col>
          <Col flex="35px" className="text-center">
            {(currentPage === 'about') &&
            <Button className="toolbar-btn" type="link" icon={<SettingOutlined />} onClick={() => {
              setDrawer({
                title: 'Right Menu',
                placement: 'right',
                visible: true
              })
            }} />}
            {isGuest !== true
              ? <Dropdown
                overlay={authMenu}
              >
                <Button type="link">
                  <UserOutlined /> {user.username}
                </Button>
              </Dropdown>
              : <Button className="toolbar-btn" type="link" icon={<LoginOutlined />} onClick={() => {
                history.push('/login')
              }} />
            }
          </Col>
        </Row>
      </Header>

      <Content className='content'>
        {children}
      </Content>

      <Footer>
        Copyright &copy; React Smart App 2020
      </Footer>

      <Drawer
        title={drawer.title}
        placement={drawer.placement}
        closable={false}
        onClose={() => {
          setDrawer({
            title: drawer.title,
            placement: drawer.placement,
            visible: false
          })
        }}
        visible={drawer.visible}
      >
        {(currentPage === 'about')
          ? <RightMenu />
          : <LeftMenu />
        }
      </Drawer>
    </BaseLayout>
  )
}

Layout.defaultProps = {
  title: 'React Smart App',
  link: '/home',
  children: <>...</>
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  link: PropTypes.string
}

export default Layout
