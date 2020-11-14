import axios from 'axios'
import * as Sentry from '@sentry/browser'

const baseURL = ''

export const axiosInstance = axios.create({
  baseURL,
  responseType: 'json',
})

export const request = async ({
  method,
  url,
  params = {},
  headers: additionalHeaders,
}) => {
  const api = axiosInstance
  let headers = { 'Content-Type': 'application/json' }
  headers = { ...headers, ...additionalHeaders }

  const queryParams = Object.entries(params)
    .filter(param => param[1] !== undefined)
    .map(param => `${param[0]}=${param[1]}`)
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
  const getUrl = url + queryString

  try {
    let response

    switch (method) {
      case 'GET':
        response = await api.get(getUrl, { headers })
        break
      case 'POST':
        response = await api.post(url, params, { headers })
        break
      default:
        response = await api.get(url, params, { headers })
        break
    }

    return response.data
  } catch (error) {
    const { response } = error

    if ([400, 401, 403, 404, 500].includes(response?.status)) {
      alert('An error occured!')
      Sentry.captureException(error)
    }

    throw error
  }
}
