import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import SwitchRoute from 'components/SwitchRoute'
import routes from 'routes'
import { Spin } from 'antd'

import 'App.css'

function App () {
  return (
    <Suspense fallback={<div style={{
      textAlign: 'center',
      marginTop: '150px'
    }}><Spin size="large" tip="Loading..." />
    </div>}>
      <Router>
        <SwitchRoute routes={routes} />
      </Router>
    </Suspense>
  )
}

export default App
