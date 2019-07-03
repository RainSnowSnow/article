
import Axios from 'axios'
import config from '@/config'
import * as Util from '@/libs/util'
import Cookie from 'js-cookie'
import iview from 'iview'
const baseUrl = config.baseUrl
const axios = Axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Authorization': Util.getToken() || '',
    'Cache-control': 'no-cache'
  }
})

function ajax (options) {
  return new Promise((resolve, reject) => {
    axios(options).then(res => {

      if (res.status === 200) {
         if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          Cookie.set('error', res.data.msg)
         iview.Message.info(res.data.msg)
          reject(new Error(res.data.msg)
          )
        }
      } else {
          reject(new Error(res.status))
      }
    }).catch(err => {
      if (reject) {
        reject(err)
      }
    })
  })
}

function setAuthorizationToken (options) {
  if (options.headers) {
    options.headers['Authorization'] = 'Bearer' + ' ' + Util.getToken() || ''
  } else {
    options.headers = {
      'Authorization': 'Bearer' + ' ' + Util.getToken() || ''
    }
  }
  return options
}

let http = {
  baseUrl: baseUrl,
  get (options) {
    options.params = options.data || {}
    options = setAuthorizationToken(options)
    return ajax({
      method: 'GET',
      ...options
    })
  },
  post (options) {
    options = setAuthorizationToken(options)
    return ajax({
      method: 'POST',
      ...options
    })
  },
  patch (options) {
    options = setAuthorizationToken(options)
    return ajax({
      method: 'PATCH',
      ...options
    })
  },
  put (options) {
    options = setAuthorizationToken(options)
    return ajax({
      method: 'put',
      ...options
    })
  },
  delete (options) {
    options = setAuthorizationToken(options)
    return ajax({
      method: 'DELETE',
      ...options
    })
  }
}

export default http
