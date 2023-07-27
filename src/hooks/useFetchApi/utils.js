import { get, flow, pick } from 'lodash/fp'
import qs from 'qs'

// This is from redux-api-call's source code since it's not exported
const REDUCER_PATH = 'api_calls'

const buildParamsString = ({ params, paramKeys }) => {
  if (paramKeys && paramKeys.length === 0) {
    return ''
  }

  return flow(pick(paramKeys), qs.stringify, str =>
    str.length == 0 ? '' : str
  )(params)
}

const customIsFetchingSelectorCreator = apiCallName => paramsString => {
  if (paramsString.length === 0) {
    return get([REDUCER_PATH, apiCallName, 'isFetching'])
  }

  return get([REDUCER_PATH, `${apiCallName}__${paramsString}`, 'isFetching'])
}

const customDataSelectorCreator = apiCallName => paramsString => {
  if (paramsString.length === 0) {
    return get([REDUCER_PATH, apiCallName, 'data'])
  }

  return get([REDUCER_PATH, `${apiCallName}__${paramsString}`, 'data'])
}

const customErrorSelectorCreator = apiCallName => paramsString => {
  if (paramsString.length === 0) {
    return get([REDUCER_PATH, apiCallName, 'error'])
  }

  return get([REDUCER_PATH, `${apiCallName}__${paramsString}`, 'error'])
}

const customLastRequestSelectorCreator = apiCallName => paramsString => {
  if (paramsString.length === 0) {
    return get([REDUCER_PATH, apiCallName, 'lastRequest'])
  }

  return get([REDUCER_PATH, `${apiCallName}__${paramsString}`, 'lastRequest'])
}

export {
  buildParamsString,
  customIsFetchingSelectorCreator,
  customDataSelectorCreator,
  customErrorSelectorCreator,
  customLastRequestSelectorCreator
}
