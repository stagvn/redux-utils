import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const usePostApi = (apiCall, options = {}) => {
  if (!apiCall) {
    return { data: null, post: null, isLoading: false, error: 'No apiCall' }
  }

  const dispatch = useDispatch()

  const { resourceName = 'item' } = options
  const rawData = useSelector(apiCall.dataSelector)
  const error = useSelector(apiCall.errorSelector)
  const isFetching = useSelector(apiCall.isFetchingSelector)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
    }
  }, [isFetching])

  const post = (params) => {
    console.debug(`Posting ${resourceName}`)
    setIsLoading(true)

    dispatch(apiCall.actionCreator(params))
  }

  const { [resourceName]: data } = rawData || {}

  return {
    rawData,
    data,
    post,
    isLoading,
    error,
  }
}

export default usePostApi
