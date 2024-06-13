import { makeFetchAction } from 'redux-api-call'
import { stub } from 'sinon'

export const makeStartErrorAction = stub()
export const makeStartAction = stub()
export const makeSuccessAction = stub()
export const makeFailureAction = stub()

export const makeFetchSuccessAction = (api, data, options = {}) => {
  const { paramKeys = [] } = options
  const apiCall = makeFetchAction(api, data)
  return {
    ...apiCall,
    name: api.name,
    paramKeys,
  }
}
