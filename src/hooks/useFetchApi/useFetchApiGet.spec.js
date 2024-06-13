/**
 * @jest-environment jsdom
 */

import { configureStore } from '@reduxjs/toolkit'
import { renderHook } from '@testing-library/react'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import timekeeper from 'timekeeper'
import { makeFetchSuccessAction } from '../../__mocks__/actions'
import useFetchApiGet from './useFetchApiGet'

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

  describe('hook run', () => {
    const store = configureStore({
      reducer: {
        apiCalls: (state = {}, action) => state,
      },
    })
    const wrapper = ({ children }) => (
      <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
    )
    const SAMPLE_API_ID = 'TEST/SAMPLE_API_ID'
    const api = {
      name: SAMPLE_API_ID,
      endpoint: `/api/call/demo`,
    }
    const apiCall = makeFetchSuccessAction(api, { data: 'test' })

    it('should set isLoading to false', () => {
      const initialState = { isLoading: false, refreshing: false }

      const { result } = renderHook(
        () => useFetchApiGet(apiCall, {}, initialState),
        { wrapper }
      )
      const {
        data,
        rawData,
        isLoading,
        refreshing,
        load,
        refresh,
        lastRequest,
      } = result.current

      expect(isLoading).to.equal(false)
      const {
        result: { current: testResult },
      } = renderHook(() => load(), { wrapper })
      console.log(testResult)
    })
  })
})
