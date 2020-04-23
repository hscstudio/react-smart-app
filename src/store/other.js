import produce from 'immer'

const initialState = {
  other1: '',
  other2: ''
}

const reducer = (currentState, action) => produce(currentState, draft => {
  switch (action.type) {
    case 'SET': {
      const { state, data } = action.payload
      draft[state] = data
      break
    }
    default:
      return currentState
  }
})

export { initialState, reducer }
