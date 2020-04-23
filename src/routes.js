import { lazy } from 'react'

import Home from 'pages/Home'
const About = lazy(() => import('pages/About'))
const Account = lazy(() => import('pages/Account'))
const Login = lazy(() => import('pages/Login'))
const NotAuthorized = lazy(() => import('pages/NotAuthorized'))
const NotFound = lazy(() => import('pages/NotFound'))

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/account',
    component: Account,
    auth: true
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home
  },
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    path: '/not-authorized',
    component: NotAuthorized
  },
  {
    path: '*',
    component: NotFound
  }
]

export default routes
