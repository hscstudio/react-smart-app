import React from 'react'
import Layout from 'components/Layout'
import useAuth from 'hooks/use-auth'
import { Form, Input, Button, message as Message } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'

const Account = () => {
  const { user, updateProfile } = useAuth()
  const onFinish = async values => {
    const { username, email } = values
    const { status, message } = await updateProfile({ username, email })
    if (status === 'success') {
      Message.success(message)
    } else {
      Message.error(message)
    }
  }
  return <>
    <Layout>
      <div className="page">
        <h2>Halaman Account</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            username: user.username,
            email: user.email
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  </>
}

export default Account
