import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.min.css'
// import 'antd/dist/antd.dark.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { SharedProvider } from './store'

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
}

ReactDOM.render(
  <>
    <SharedProvider>
      <App />
    </SharedProvider>
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
