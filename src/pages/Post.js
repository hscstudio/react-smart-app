import React from 'react'
import Layout from 'components/Layout'
import { Skeleton, message as Message } from 'antd'
import TimeAgo from 'timeago-react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import useAuth from 'hooks/use-auth'

const API_URL = process.env.REACT_APP_API_URL

const getPost = async (props, callback) => {
  const { user, slug } = props
  const options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`
    },
    timeout: 30000
  }
  try {
    const response = await Axios.get(`${API_URL}/api/v1/post/${slug}`, options)
    callback(response.data)
  } catch (e) {
    const data = {
      status: 'error',
      message: 'Fatal error'
    }
    callback(data)
  }
}

const Post = () => {
  const { slug } = useParams()
  const [initial, setInitial] = React.useState(true)
  const [post, setPost] = React.useState({})
  const { user } = useAuth()

  React.useEffect(() => {
    if (initial) {
      setInitial(false)
      getPost({ user, slug }, response => {
        const { status, message, data } = response
        if (status === 'success') {
          setPost(data)
        } else {
          Message.error(message)
        }
      })
    }
  }, [initial, slug, user])

  console.log(post)
  return <>
    <Layout>
      <div className="page">
        {(post && Object.keys(post).length > 0)
          ? <>
            <h2><a href={`post/${post.slug}`}>{post.title}</a></h2>
            <small>by {post.user && post.user.username} at <TimeAgo datetime={post.updated_at} /></small>
            <p><img src={post.image} alt={`${post.slug}`} style={{ float: 'left', marginRight: '5px' }} /> {post.content}</p>
          </>
          : <Skeleton active/>
        }
      </div>
    </Layout>
  </>
}

export default Post
