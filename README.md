# `@stagapps/redux-api-call-hooks` useFetchApi hooks

## useFetchApiList

This hook is to fetch data of a list. The data is stored in redux under reducer 'custom_list_api_calls'

### params

#### apiCall

The apiCall defined by enhancedMakeFetchAction

#### options

{ defaultParams: object, resourceName: string }

- defaultParams: the default params with will be called with load and refresh (see below). Use this option if you don't want to pass params every time you call load or refresh.
- resourceName: the key to get data from the response. Default is 'items'.

### result

The result will have the following shape

```
  {
    data,
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
```

- data: The full list of items. After calling loadMore, the responded items will be appended to this list.
- load: function to fetch data. The params passed to this function will be merged with the defaultParams. Dont use this function if you want to refresh data, use refresh instead. Only use this function to load data in the first time.
- isLoading: true if the network request from load function is in-flight.
- loadMore: function to load more data. Mostly used in FlatList or SectionList. The params passed to this function will be merged with the defaultParams.
- isLoadingMore: true if the network request from loadMore function is in-flight.
- refresh: function to refresh the data. Data will be replaced with the response of this request. The params passed to this function will be merged with the defaultParams.
- refreshing: true if the network request from refresh function is in-flight.
- error: error from server if any.
- paging: the paging object
- lastRequest: The timestamp of the last sent network request. Useful when you want to check if load is called.

## useFetchApiGet

This hook is to fetch data of an item/object.

### params

#### apiCall

The apiCall defined by enhancedMakeFetchAction

#### options

{ defaultParams: object, resourceName: string }

- defaultParams: the default params with will be called with load and refresh (see below). Use this option if you don't want to pass params every time you call load or refresh.
- resourceName: the key to get data from the response. Default is 'item'.

### result

The result will have the following shape

```
  {
    data,
    rawData,
    load,
    isLoading,
    refresh,
    refreshing,
    error,
    lastRequest,
  }
```

- data: The data extracted from the response by resourceName
- rawData: The data responded from server.
- load: function to fetch data. The params passed to this function will be merged with the defaultParams. Dont use this function if you want to refresh data, use refresh instead. Only use this function to load data in the first time.
- isLoading: true if the network request from load function is in-flight.
- refresh: function to refresh the data. Data will be replaced with the response of this request. The params passed to this function will be merged with the defaultParams.
- refreshing: true if the network request from refresh function is in-flight.
- error: error from server if any.
- lastRequest: The timestamp of the last sent network request. Useful when you want to check if load is called.
