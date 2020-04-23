
import LZString from 'lz-string'
const STORAGE_PREFIX = process.env.REACT_APP_STORAGE_PREFIX

const read = (initialStates, storage = localStorage) => {
  try {
    return Object.keys(initialStates).reduce((acc, key) => {
      const storageKey = STORAGE_PREFIX + key
      let newState = initialStates[key]
      if (storage.getItem(storageKey) !== null) {
        if (process.env.NODE_ENV === 'production') {
          newState = JSON.parse(LZString.decompress(storage.getItem(storageKey)))
        } else {
          newState = JSON.parse(storage.getItem(storageKey))
        }
      }
      acc[key] = newState
      return acc
    }, {})
  } catch (e) {
    // console.log(e)
    return initialStates
  }
}

const write = (state, key, storage = localStorage) => {
  try {
    let data = ''
    if (process.env.NODE_ENV === 'production') {
      data = LZString.compress(JSON.stringify(state))
    } else {
      data = JSON.stringify(state)
    }
    storage.setItem((STORAGE_PREFIX + key), data)
  } catch (e) {
    // console.log(e)
  }
}

export default { read, write }
