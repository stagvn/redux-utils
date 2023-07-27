import { useState, useEffect } from 'react'
import { compact, flow, getOr, join } from 'lodash/fp'
import { useSelector, useDispatch } from 'react-redux'

import {
  buildParamsString,
  customErrorSelectorCreator,
  customIsFetchingSelectorCreator,
  customLastRequestSelectorCreator,
} from './utils'
import { customListDataSelectorCreator } from '../../reducers/reduxListApiCall'

const useFetchApiList = (apiCall, options = {}, initialState = {}) => {
  const {
    defaultParams = {},
    resourceName = 'items',
    pagingResourceName = 'paging',
  } = options
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
    customListDataSelectorCreator(apiCall.name)(paramsString)
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
        name: flow(compact, join('__'))([apiCall.name, paramsString]),
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
