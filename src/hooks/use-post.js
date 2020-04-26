import React from 'react'
import Axios from 'axios'
import useAuth from 'hooks/use-auth'

const API_URL = process.env.REACT_APP_API_URL

Axios.defaults.validateStatus = function () {
  return true
}

const POST_PER_PAGE = 10

const getPosts = async (props, callback) => {
  const { user, page } = props
  const options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`
    },
    timeout: 30000
  }
  try {
    const response = await Axios.get(`${API_URL}/api/v1/posts?page=${page}`, options)
    callback(response.data)
  } catch (e) {
    const data = {
      status: 'error',
      message: 'Fatal error'
    }
    callback(data)
  }
}

export default () => {
  const { user } = useAuth()
  const [posts, setPosts] = React.useState([])
  const [loadingPosts, setLoadingPosts] = React.useState([])
  const [initial, setInitial] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [visibleLoadMore, setVisibleLoadMore] = React.useState(true)
  const [error, setError] = React.useState('')
  const onLoadMore = () => {
    setLoading(true)
    setLoadingPosts(
      loadingPosts.concat([
        ...new Array(POST_PER_PAGE)].map(() => ({
        loading: true, name: {}
      })))
    )

    getPosts({ user, page }, response => {
      const { status, data, message } = response
      if (status === 'success') {
        if (data.data && data.data.length > 0) {
          const concatData = [...posts, ...data.data]
          setLoadingPosts(concatData)
          setPosts(concatData)
          if (page === data.lastPage) {
            setVisibleLoadMore(false)
          } else {
            setVisibleLoadMore(true)
            setPage(page + 1)
          }
        } else {
          setLoadingPosts(posts)
          setVisibleLoadMore(false)
        }
      } else {
        setError(message)
      }
    })

    setLoading(false)
  }

  React.useEffect(() => {
    if (initial && user) {
      setLoading(true)
      setInitial(false)
      getPosts({ user, page }, response => {
        const { status, data, message } = response
        if (status === 'success') {
          if (data.data && data.data.length > 0) {
            setPosts(data.data)
            setLoadingPosts(data.data)
          }
          if (page === data.lastPage) {
            setVisibleLoadMore(false)
          } else {
            setVisibleLoadMore(true)
            setPage(page + 1)
          }
        } else {
          setError(message)
        }
      })
      setLoading(false)
    }
  }, [initial, page, user])

  return {
    user,
    getPosts,
    initial,
    setInitial,
    posts,
    setPosts,
    loadingPosts,
    setLoadingPosts,
    loading,
    setLoading,
    page,
    setPage,
    visibleLoadMore,
    setVisibleLoadMore,
    onLoadMore,
    error
  }
}
