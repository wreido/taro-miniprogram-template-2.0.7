import Taro from '@tarojs/taro'
import { API_ORIGIN } from './baseUrl'

// 添加拦截器
// Taro.addInterceptor(Taro.interceptors.logInterceptor)

function showErrorMsg(message = '活动太火爆，请稍后再试~~') {
  setTimeout(() => {
    Taro.showToast({
      title: message,
      icon: 'none',
      duration: 2500,
    })
  }, 32)
}

/**
 * http 请求
 * @param{String} method: http method
 * @param{String} path: 地址路径
 * @param{Object} data: 请求参数
 * @param{Object} options: 其它配置
 * @returns{Promise}
 */

const $fetch = (path, data = {}, options = { loading: true }) => {

  if (data.constructor !== Object) return showErrorMsg('参数非法')
  if (options.constructor !== Object) return showErrorMsg('配置非法')

  const ops = {
    url: API_ORIGIN + path,
    data,
    method: options.method ? options.method : 'POST',
    dataType: 'json',
    header: {
      ...options.header,
    },
  }
  return new Promise((resolve, reject) => {

    if (options.loading) Taro.showLoading({ title: '加载中..', mask: true })

    Taro.request(ops)
      .then((res) => {
        Taro.hideLoading()
        resolve(res || {})
      })
      .catch((err) => {
        Taro.hideLoading()
        showErrorMsg()
        reject(err || {})
      })
  })
}

export default $fetch
export { default as $api } from './api'




