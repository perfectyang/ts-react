/*
 * @Descripttion: 自己用的一版请求
 * @Author: perfectyang
 * @Date: 2019-09-05 17:36:12
 * @LastEditors: perfectyang
 * @LastEditTime: 2019-09-06 10:36:54
 */
import axios from 'axios'
import qs from 'qs'
import isObject from 'lodash/isObject'
import Vue from 'vue'
import { getQueryString } from 'Lib/utils'
// import CancelToken from './cancel-token'
import monitor from '@/allApi/methods/monitor'
import getBaseUrl from 'Lib/utils/envConfig'
window._axiosPromiseArr = []
const fetch = axios.create({
  baseURL: getBaseUrl()
  // timeout: 20000,
})

const config = { // 默认post和get方法的内容类型
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

fetch.interceptors.request.use((config) => {
  // console.log('config---', config)
  let tokenId
  if (getQueryString('from_sass')) {
    tokenId = getQueryString('token_id') || JSON.parse(window.sessionStorage.getItem('user') || '{}').token_id || ''
  } else {
    tokenId = JSON.parse(window.sessionStorage.getItem('user') || '{}').token_id || getQueryString('token_id') || ''
  }
  if (config.method === 'get') {
    !config.params.token_id && (config.params.token_id = tokenId)
  }
  if (Object.prototype.toString.call(config.data) === '[object FormData]') {
    config.headers['Content-Type'] = 'multipart/form-data'
    config.data.append('token_id', tokenId)
  }
  if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    if(config.data) {
      Object.keys(config.data).forEach((key) => {
        if (isObject(config.data[key])) {
          config.data[key] = JSON.stringify(config.data[key])
        }
      })
      !config.data.token_id && (config.data.token_id = tokenId)
      config.data = qs.stringify(config.data)
    }else {
      config.data = qs.stringify({})
    }
  }
  if(config.headers['Content-Type'] === 'application/json') {
    if(config.data) {
      !config.data.token_id && (config.data.token_id = tokenId)
    }else {
      config.data = {}
    }
  }
  config.cancelToken = new axios.CancelToken((cancel) => {
    window._axiosPromiseArr.push({ cancel })
  })
  return config
}, (error) => Promise.reject(error))
fetch.interceptors.response.use((response) => response, (error) => {
  const { config } = error
  const data = {}
  for (const [key, value] of config.data) {
    data[key] = value
  }
  monitor.log({
    uId: JSON.parse(window.sessionStorage.getItem('user') || '{}').advertiser_id,
    rUrl: config.baseURL + config.url,
    rParam: data,
    level: 'error',
    type: 'HTTP',
    data: error.message
  })
  console.log('error', error, '=>>>', config.url)
  if (!axios.isCancel(error)) {
    /* eslint-disable no-new */
    (new Vue()).$alertMsg({
      type: 'error',
      message: '请求失败！请重试',
      duration: 1500
    })
  }
  return Promise.reject(error)
})
// resFormate控制返回数据结构层级
const handlResult = (res, promiseType, resFormate) => {
  const {resolve, reject} = promiseType
  if (/^([-1-9]\d*)$/.test(+res.data.code)) {
    /* eslint-disable no-new */
    (new Vue()).$alertMsg({
      type: 'error',
      message: res.data.message,
      duration: 1500
    })
    reject(res.data.message)
  } else {
    resolve(resFormate ? res.data.data : res.data)
  }
}

export function post (url, data, resFormate = true, option = {}) {
  return new Promise((resolve, reject) => {
    fetch.post(url, data, Object.assign(config, option)).then((response) => {
      handlResult(response, {resolve, reject}, resFormate)
    }).catch((err) => {
      /* eslint-disable no-new */
      (new Vue()).$alertMsg({
        type: 'error',
        message: err,
        duration: 1500
      })
      reject(err)
    })
  })
}

export function postJson (url, data, resFormate = true) {
  return post(url, data, resFormate, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function get (url, data, resFormate = true) {
  return new Promise((resolve, reject) => {
    fetch.get(url, Object.assign({
      params: data
    }, config)).then(response => {
      handlResult(response, {resolve, reject}, resFormate)
    }, err => {
      (new Vue()).$alertMsg({
        type: 'error',
        message: err,
        duration: 1500
      })
      reject(err)
    })
  })
}
