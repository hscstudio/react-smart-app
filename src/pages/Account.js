import React from 'react'
import Layout from 'components/Layout'
import { useShared } from 'store'

const Account = () => {
  const general = useShared('general')[0]
  return <>
    <Layout>
      <div className="page">
        <h2>Halaman Account</h2>
        {general.user && general.user.username}
      </div>
    </Layout>
  </>
}

export default Account
