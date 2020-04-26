import React from 'react'
import Layout from 'components/Layout'
import { Form, Input, Button, message as Message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import useAuth from 'hooks/use-auth'

const Signup = () => {
  const { signup } = useAuth()
  const history = useHistory()

  const onFinish = async values => {
    const { username, email, password } = values
    const { status, message } = await signup({ username, email, password })
    if (status === 'success') {
      Message.success(message)
      history.push('/home')
    } else {
      Message.error(message)
    }
  }
  return <>
    <Layout>
      <div className="page">
        <h2>Form Signup</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Signup
            </Button>
            &nbsp; or &nbsp;
            <a href="/login">Login now!</a>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  </>
}

export default Signup
