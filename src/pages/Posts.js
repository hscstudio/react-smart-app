import React from 'react'
import Layout from 'components/Layout'
import usePost from 'hooks/use-post'
import { List, Button, Skeleton, message as Message } from 'antd'
import TimeAgo from 'timeago-react'

const Posts = () => {
  const {
    initial,
    loadingPosts,
    loading,
    visibleLoadMore,
    onLoadMore,
    error
  } = usePost()

  React.useEffect(() => {
    if (error && error.length > 0) Message.error(error)
  }, [error])

  const loadMore =
      !initial && !loading && visibleLoadMore ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px'
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null

  const getTitle = (item) => {
    return <>
      <a href={`post/${item.slug}`}>{item.id} ~ {item.title}</a>
      <br />
      <small>by {item.user && item.user.username} at <TimeAgo datetime={item.created_at} /></small>
    </>
  }
  return <>
    <Layout>
      <div className="page">
        <List
          className="demo-loadmore-list"
          loading={initial}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={loadingPosts}
          renderItem={(item, index) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <img src={item.image} alt={`${index}`} className="post-image" />
                <List.Item.Meta
                  title={getTitle(item)}
                  description={`${item.excerpt}...`}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </Layout>
  </>
}

export default Posts
