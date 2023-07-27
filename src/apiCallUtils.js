import { makeFetchAction as baseMakeFetchAction } from 'redux-api-call'
import qs from 'qs'

// This function helps remove undefined and null params
// Ex generateEndpoint({host: "abc.com", params: {a: 1, b: undefined, c: null}})
// => "abc.com?a=1&c="
const generateEndpoint = ({ host, params }) => {
  const queryString = qs.stringify(params, { arrayFormat: 'brackets' })

  return queryString ? `${host}?${queryString}` : host
}

// This function wraps makeFetchAction and add apiName and paramKeys
//
// Each apiCall will have a key which is the apiName and store data
// in redux with that key. It means all fetched data with different params
// will be stored under the same key. So the later response will override
// the previous response
//
// Use paramKeys to specify the list of params that you want to separately
// stored its response
const enhancedMakeFetchAction = (apiName, endpointGenerator, options = {}) => {
  const { paramKeys = [] } = options
  const apiCall = baseMakeFetchAction(apiName, endpointGenerator)

  return {
    ...apiCall,
    name: apiName,
    paramKeys,
  }
}

export { generateEndpoint, enhancedMakeFetchAction }
