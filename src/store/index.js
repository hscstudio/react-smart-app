import React from 'react'
import PropTypes from 'prop-types'
// import { useImmerReducer } from 'use-immer'
import initialStates from './states'
import reducers from './reducers'
import storage from 'utils/storage'

const states = storage.read(initialStates)

const contextStates = Object.keys(states).reduce((acc, key) => {
  acc[key] = React.createContext()
  return acc
}, {})
const contextDispatchs = Object.keys(states).reduce((acc, key) => {
  acc[key] = React.createContext()
  return acc
}, {})

function Reducer (key) {
  return React.useReducer(reducers[key], states[key])
}

function SharedProvider ({ children }) {
  const Providers = Object.keys(states).reduceRight((acc, key) => {
    const stores = Reducer(key)
    const contextState = contextStates[key]
    const contextDispatch = contextDispatchs[key]
    return (
      <contextState.Provider value={stores[0]}>
        <contextDispatch.Provider value={stores[1]}>
          {acc}
        </contextDispatch.Provider>
      </contextState.Provider>
    )
  }, children)

  return Providers
}

SharedProvider.propTypes = {
  children: PropTypes.node
}

function useShared (key) {
  const state = React.useContext(contextStates[key])
  const dispatch = React.useContext(contextDispatchs[key])
  storage.write(state, key)
  if (state === undefined || dispatch === undefined) {
    throw new Error('useShared must be used within a SharedProvider')
  }
  return [state, dispatch]
}

export { SharedProvider, useShared }
