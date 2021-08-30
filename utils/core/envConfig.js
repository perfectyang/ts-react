const getUrl = () => {
  const { hostname } = window.location
  let { PROXY_TARGET } = process.env // 环境变量
  PROXY_TARGET = PROXY_TARGET.replace(/(https*:\/\/)(.*)/, '$2')
  const isDev = /^dev2|dev|test|am|eu/.test(hostname)
  const local = /^192|127|localhost/.test(hostname)
  const url = local && PROXY_TARGET ? PROXY_TARGET : hostname
  const env = /^(dev2|dev|test|grayscale|gray)/.exec(url)
  const area = /^(am|eu)/.exec(hostname)
  const httpUrl = [
    '//',
    (isDev || local) ? (area ? area[0] : (env ? `${env[0]}_` : 'dev_')) : '',
    'cloud.qdtech.ai'
  ].join('')
  return httpUrl
}
const cache = () => {
  let url
  return () => {
    return url ? url : (url = getUrl())
  }
}
const getBaseUrl = cache()
export const baseUrl = getBaseUrl()
export default getBaseUrl
