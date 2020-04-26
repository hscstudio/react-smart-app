// import React from 'react'
import Axios from 'axios'
import { useShared } from 'store'

const API_URL = process.env.REACT_APP_API_URL

Axios.defaults.validateStatus = function () {
  return true
}

export default () => {
  const [general, setGeneral] = useShared('general')
  const user = general.user
  const isGuest = general.guest

  const signup = async (props) => {
    const { username, email, password } = props
    const payload = new FormData()
    payload.append('username', username)
    payload.append('email', email)
    payload.append('password', password)
    try {
      const response = await Axios.post(`${API_URL}/api/v1/signup`, payload)
      const { status, data, message } = response.data
      console.log(response.data)
      if (status === 'success') {
        setGeneral({
          type: 'SET',
          payload: {
            state: 'user',
            data
          }
        })
        setGeneral({
          type: 'SET',
          payload: {
            state: 'guest',
            data: false
          }
        })
        return { status, message: 'Signup successfully' }
      } else {
        return { status, message }
      }
    } catch (e) {
      return { status: 'error', message: 'Fatal error' }
    }
  }

  const login = async (props) => {
    const { username, password } = props
    const payload = new FormData()
    payload.append('username', username)
    payload.append('password', password)
    try {
      const response = await Axios.post(`${API_URL}/api/v1/login`, payload)
      const { status, data, message } = response.data
      if (status === 'success') {
        setGeneral({
          type: 'SET',
          payload: {
            state: 'user',
            data
          }
        })
        setGeneral({
          type: 'SET',
          payload: {
            state: 'guest',
            data: false
          }
        })
        return { status, message: 'Login successfully' }
      } else {
        return { status, message }
      }
    } catch (e) {
      return { status: 'error', message: 'Fatal error' }
    }
  }

  const logout = () => {
    setGeneral({
      type: 'SET',
      payload: {
        state: 'user',
        data: {}
      }
    })
    setGeneral({
      type: 'SET',
      payload: {
        state: 'guest',
        data: true
      }
    })
    return { status: 'success', message: 'Logout successfully' }
  }

  const updateProfile = async (props) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`
      },
      timeout: 30000
    }
    const { username, email } = props
    const payload = new FormData()
    payload.append('username', username)
    payload.append('email', email)
    try {
      const response = await Axios.post(`${API_URL}/api/v1/profile`, payload, options)
      const { status, data, message } = response.data
      if (status === 'success') {
        const concatData = { ...user, ...data }
        setGeneral({
          type: 'SET',
          payload: {
            state: 'user',
            data: concatData
          }
        })
        return { status, message: 'Update successfully' }
      } else {
        return { status, message }
      }
    } catch (e) {
      console.log(e)
      return { status: 'error', message: 'Fatal error x' }
    }
  }

  return {
    user, isGuest, signup, login, logout, updateProfile
  }
}
