import React from 'react'
import Layout from 'components/Layout'
import { Form, Input, Button, Checkbox, message as Message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import useAuth from 'hooks/use-auth'

const Login = () => {
  const { login } = useAuth()
  const history = useHistory()

  const onFinish = async values => {
    const { username, password } = values
    const { status, message } = await login({ username, password })
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
        <h2>Form Login</h2>
        * username: admin & password: 123456
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/forgot-password">
            Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
            &nbsp; or &nbsp;
            <a href="/signup">Signup now!</a>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  </>
}

export default Login
