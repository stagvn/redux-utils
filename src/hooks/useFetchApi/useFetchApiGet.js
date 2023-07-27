import { compact, flow, join } from 'lodash/fp'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import {
  buildParamsString,
  customDataSelectorCreator,
  customErrorSelectorCreator,
  customIsFetchingSelectorCreator,
  customLastRequestSelectorCreator,
} from './utils'

const useFetchApiGet = (
  apiCall,
  options = {},
  initialState = { isLoading: true, refreshing: false }
) => {
  const { defaultParams = {}, resourceName = 'item' } = options
  const dispatch = useDispatch()

  const [paramsString, setParamsString] = useState('')

  const error = useSelector(
    customErrorSelectorCreator(apiCall.name)(paramsString)
  )
  const isFetching = useSelector(
    customIsFetchingSelectorCreator(apiCall.name)(paramsString)
  )
  const lastRequest = useSelector(
    customLastRequestSelectorCreator(apiCall.name)(paramsString)
  )

  const rawData = useSelector(
    customDataSelectorCreator(apiCall.name)(paramsString)
  )

  const [isLoading, setIsLoading] = useState(initialState.isLoading)
  const [refreshing, setRefreshing] = useState(initialState.refreshing)

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
      setRefreshing(false)
    }
  }, [isFetching])

  const customActionCreator = (params) => {
    const action = apiCall.actionCreator({ ...defaultParams, ...params })
    const paramsString = buildParamsString({
      params: { ...defaultParams, ...params },
      paramKeys: apiCall.paramKeys,
    })

    // Important! This is to make the selector return correct data
    setParamsString((_) => paramsString)

    return {
      ...action,
      payload: {
        ...action.payload,
        name: flow(compact, join('__'))([apiCall.name, paramsString]),
      },
    }
  }

  const refresh = (params) => {
    console.debug(`Refreshing ${resourceName}`)
    setRefreshing(true)
    dispatch(customActionCreator(params))
  }

  const load = (params) => {
    console.debug(`Fetching ${resourceName}`)
    setIsLoading(true)
    dispatch(customActionCreator(params))
  }

  const { [resourceName]: data } = rawData || {}

  return {
    rawData,
    data,
    load,
    isLoading,
    refresh,
    refreshing,
    error,
    lastRequest,
  }
}

export default useFetchApiGet
