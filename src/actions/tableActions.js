import { CALL_API } from '../middleware/api'
import { REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST } from './actionTypes'

export function fetchTableList() {
  return {
    [CALL_API]: {
      endpoint: 'tables/',
      config: { method: 'get', },
      authenticated: true,
      types: [ REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST ],
    }
  }
}
