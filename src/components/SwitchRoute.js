import React from 'react'
import PropTypes from 'prop-types'
import {
  Switch, Redirect
} from 'react-router-dom'
import GuardRoute from 'utils/GuardRoute'

const SwitchRoute = ({ routes = [] }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        const { component: Component, ...rest } = route
        return <GuardRoute key={i} {...rest}><Component /></GuardRoute>
      })}
      <Redirect from='*' to='/' />
    </Switch>
  )
}

SwitchRoute.propTypes = {
  routes: PropTypes.array
}

export default SwitchRoute
