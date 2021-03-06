import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  if (!params) {
    return `${baseUrl}/api/${url}`
  }
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api/${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then(res => {
        const { data } = res
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
}

export const post = ({ url, params, data }) => {
  return new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), data)
      .then(res => {
        if (res.data && res.data.success === true) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }).catch(reject)
  })
}

export default {}
