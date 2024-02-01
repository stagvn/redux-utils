import { compact, flow, getOr, join } from 'lodash/fp'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { customListDataSelectorCreator } from '../../reducers/reduxListApiCall'
import {
  buildParamsString,
  customErrorSelectorCreator,
  customIsFetchingSelectorCreator,
  customLastRequestSelectorCreator,
} from './utils'

const useFetchApiList = (apiCall, options = {}, initialState = {}) => {
  const {
    defaultParams = {},
    apiCallSufixName = '',
    resourceName = 'items',
    pagingResourceName = 'paging',
  } = options
  const dispatch = useDispatch()

  const apiCallName = apiCallSufixName
    ? `${apiCall.name}_${apiCallSufixName}`
    : apiCall.name

  const [paramsString, setParamsString] = useState('')

  const error = useSelector(
    customErrorSelectorCreator(apiCallName)(paramsString)
  )
  const isFetching = useSelector(
    customIsFetchingSelectorCreator(apiCallName)(paramsString)
  )
  const lastRequest = useSelector(
    customLastRequestSelectorCreator(apiCallName)(paramsString)
  )

  const rawData = useSelector(
    customListDataSelectorCreator(apiCallName)(paramsString)
  )

  const fullData = getOr([], resourceName)(rawData)
  const paging = getOr({ page_count: 1, page: 1 }, pagingResourceName)(rawData)

  const [isLoading, setIsLoading] = useState(initialState.isLoading || true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
      setIsLoadingMore(false)
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
        name: flow(compact, join('__'))([apiCallName, paramsString]),
        resourceName,
        isList: true,
      },
    }
  }

  const refresh = (params) => {
    console.debug(`Refreshing ${resourceName}`)
    setRefreshing(true)
    dispatch(customActionCreator({ ...params }))
  }

  const load = (params) => {
    console.debug(`Fetching ${resourceName}`)
    setIsLoading(true)
    dispatch(customActionCreator({ ...params }))
  }

  const loadMore = (params) => {
    const { page_count, page } = paging
    const nextPage = page + 1

    if (nextPage > page_count) {
      return
    }

    console.debug(`Fetching more ${resourceName}`, nextPage)
    setIsLoadingMore(true)

    dispatch(customActionCreator({ ...params, page: nextPage }))
  }

  return {
    rawData,
    data: fullData,
    load,
    isLoading,
    loadMore,
    isLoadingMore,
    refresh,
    refreshing,
    error,
    paging,
    lastRequest,
  }
}

export default useFetchApiList
