/* 构建相关 */
export const ENV = process.env.CONFIG_ENV // 当前环境
export const CONFIG_ENV_DEV = 'development' // 开发环境
export const CONFIG_ENV_TEST = 'testing' // 测试环境
export const CONFIG_ENV_PROD = 'production' // 生产环境
export const IS_DEV = ENV === CONFIG_ENV_DEV
export const IS_TEST = ENV === CONFIG_ENV_TEST
export const IS_PROD = ENV === CONFIG_ENV_PROD

let URL = {
  development: 'https://api-hszy-test.91kuiayigou.cn',
  testing: 'https://test.com',
  production: 'https://prod.com'
}

export const API_ORIGIN = URL[ENV]