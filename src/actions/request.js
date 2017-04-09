import { apiKey, baseUrl } from '../samples/sampleKey.js'
import urljoin from 'url-join'
import { clearStorage, logout } from './userActions'
import { store } from '../index.js'
import errorTable from '../utils/errorTable.json'

const generateHeader = () => ({
  'x-access-apikey': apiKey,
  'x-access-token': sessionStorage.getItem('snutt_token') ||
    localStorage.getItem('snutt_token'),
  'Content-Type': 'application/x-www-form-urlencoded',
})

const errorHandler = (err) => {
  // Just put to console for now
  console.log("Error from handler::", err)
  const errDetail = errorTable.find(row => row.code === err.code) ||
                  { code: -1, message: "알 수 없는 에러가 발생했습니다." }
  alert(errDetail.message)
  if (Number(err.code) === 8194) {
    console.log("Invalid token")
    store.dispatch(logout())
  }
}

export default function request(endpoint, apiConfig) {
  const url = urljoin(baseUrl, endpoint)
  const config = Object.assign(apiConfig, {
    headers: Object.assign(generateHeader(), apiConfig.headers)
  })
  console.log(endpoint, config)

  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(parseJSON)
      .then((response) => {
        if (response.ok)
          return resolve(response.json)
        else {
          errorHandler(response.json)
          return reject(response.json.message)
        }
      })
      .catch((error) => {
        errorHandler({
          "errcode": 1,
          "message": "NetworkError"
        })
      })
  })
}

function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}
