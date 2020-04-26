import { lazy } from 'react'

import Home from 'pages/Home'
const About = lazy(() => import('pages/About'))
const Account = lazy(() => import('pages/Account'))
const Login = lazy(() => import('pages/Login'))
const Signup = lazy(() => import('pages/Signup'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword'))
const Posts = lazy(() => import('pages/Posts'))
const Post = lazy(() => import('pages/Post'))
const NotAuthorized = lazy(() => import('pages/NotAuthorized'))
const NotFound = lazy(() => import('pages/NotFound'))

const routes = [
  {
    path: '/post/:slug',
    component: Post,
    auth: true
  },
  {
    path: '/posts/:page?',
    component: Posts,
    auth: true
  },
  {
    path: '/forgot-password',
    component: ForgotPassword
  },
  {
    path: '/signup',
    component: Signup
  },
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
