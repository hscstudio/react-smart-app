import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import { useShared } from 'store'
import PropTypes from 'prop-types'

const GuardRoute = ({ auth, children, ...rest }) => {
  const general = useShared('general')[0]
  const safeProps = { ...rest }
  delete safeProps.component
  return (
    (auth && general.guest)
      ? <Redirect to='/not-authorized' />
      : <Route
        {...safeProps}
        render={() => {
          return children
        }}
      />
  )
}

GuardRoute.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default GuardRoute
