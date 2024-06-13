import { expect } from 'chai'
import { get } from 'lodash'
import { ACTIONS } from 'redux-api-call'
import timekeeper from 'timekeeper'
import reduxListApiCall from './reduxListApiCall'

const reducer = reduxListApiCall['redux_api_call_hooks/list']

describe('reducer', () => {
  beforeAll(() => {
    timekeeper.freeze(Date.now())
  })

  afterAll(() => {
    timekeeper.reset()
  })

  describe('FETCH_START handler without `error` property', () => {
    const state = {
      UTILS_GET_API_CALL: {
        data: {
          key: 'old_value',
        },
        isFetching: false,
        error: {
          message: 'some error has occurred',
        },
      },
    }

    const setup = () => {
      const action = {
        type: ACTIONS.COMPLETE,
        payload: {
          name: 'UTILS_GET_API_CALL',
          isList: false,
          resourceName: 'item',
          json: {
            data: { key: 'new_value' },
          },
        },
      }
      return reducer(state, action)
    }

    it('should set isFetching to false', () => {
      expect(get(setup(), 'UTILS_GET_API_CALL.isFetching')).to.equal(false)
    })

    it('should keep previous data as is (referential transparent)', () => {
      expect(get(setup(), 'UTILS_GET_API_CALL.data')).to.equal(
        state.UTILS_GET_API_CALL.data
      )
    })

    it('should keep previous error as is (referential transparent)', () => {
      expect(get(setup(), 'UTILS_GET_API_CALL.error')).to.equal(
        state.UTILS_GET_API_CALL.error
      )
    })
  })
})
