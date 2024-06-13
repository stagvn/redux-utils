/**
 * @jest-environment jsdom
 */
import { Tuple, configureStore } from '@reduxjs/toolkit'
import { act, renderHook, waitFor } from '@testing-library/react'
import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { middleware, reducers } from 'redux-api-call'
import timekeeper from 'timekeeper'
import { enhancedMakeFetchAction } from '../../apiCallUtils'
import reduxListApiCall from '../../reducers/reduxListApiCall'
import useFetchApiGet from './useFetchApiGet'

const API_CALL_URL = 'http://localhost:3000/api/call/test'
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
)

describe('useFetchApiGet', () => {
  beforeAll(() => {
    timekeeper.freeze(Date.now())
  })

  afterAll(() => {
    timekeeper.reset()
  })

  const store = configureStore({
    reducer: combineReducers({
      ...reducers,
      ...reduxListApiCall,
    }),
    middleware: () => new Tuple(middleware),
  })

  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  )

  describe('hook run', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    beforeEach(() => {
      fetchMock.mock(API_CALL_URL, {
        data: { everything: 'ok' },
      })
    })

    const SAMPLE_API_ID = 'TEST/SAMPLE_API_ID'
    const apiCall = enhancedMakeFetchAction(SAMPLE_API_ID, () => ({
      endpoint: API_CALL_URL,
      method: 'GET',
    }))

    it('should be ok', async () => {
      const initialState = { isLoading: false, refreshing: false }
      const { result } = renderHook(
        () => useFetchApiGet(apiCall, { resourceName: 'data' }, initialState),
        { wrapper }
      )

      expect(result.current.isLoading).to.equal(false)

      act(() => {
        result.current.load()
      })

      expect(result.current.isLoading).to.equal(true)

      await waitFor(() => {
        expect(result.current.data).to.deep.equal({ everything: 'ok' })
      })
    })
  })
})
