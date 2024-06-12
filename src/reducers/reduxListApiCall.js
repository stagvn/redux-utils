import { get, omit } from 'lodash/fp'
import { ACTIONS } from 'redux-api-call'

const REDUCER_LIST_PATH = 'redux_api_call_hooks/list'

const reduxListApiCallReducer = (state = {}, action) => {
  const { type, payload } = action

  try {
    switch (type) {
      case ACTIONS.COMPLETE:
        const { name, isList, resourceName, json } = payload

        if (!isList) {
          return state
        }

        return {
          ...state,
          [name]: json,
        }
      case ACTIONS.DISPOSE:
        const { name: disposeName } = payload
        return omit([disposeName])(state)
    }

    return state
  } catch (error) {
    console.log(error)
    return state
  }
}

const customListDataSelectorCreator = (apiCallName) => (paramsString) => {
  if (paramsString.length === 0) {
    return get(`${REDUCER_LIST_PATH}.${apiCallName}`)
  }

  return get(`${REDUCER_LIST_PATH}.${apiCallName}__${paramsString}`)
}

export { customListDataSelectorCreator }

export default {
  [REDUCER_LIST_PATH]: reduxListApiCallReducer,
}
