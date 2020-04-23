import React from 'react'
import Layout from 'components/Layout'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useShared } from 'store'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const setGeneral = useShared('general')[1]
  const history = useHistory()

  const onFinish = values => {
    // console.log('Received values of form: ', values)
    const { username, password } = values
    if (username === 'admin' && password === '123456') {
      setGeneral({
        type: 'SET',
        payload: {
          state: 'user',
          data: {
            id: 1,
            username: 'admin'
          }
        }
      })
      setGeneral({
        type: 'SET',
        payload: {
          state: 'guest',
          data: false
        }
      })
      history.push('/home')
    } else {
      message.error('Login failed')
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
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  </>
}

export default Login
