/* 构建相关 */
export const ENV = process.env.CONFIG_ENV // 当前环境
export const CONFIG_ENV_DEV = 'development' // 开发环境
export const CONFIG_ENV_TEST = 'testing' // 测试环境
export const CONFIG_ENV_PROD = 'production' // 生产环境
export const IS_DEV = ENV === CONFIG_ENV_DEV
export const IS_TEST = ENV === CONFIG_ENV_TEST
export const IS_PROD = ENV === CONFIG_ENV_PROD

export const API_ORIGIN_DEV = 'https://yx-dev.hebyinkai.com'
export const API_ORIGIN_TEST = 'https://test.com'
export const API_ORIGIN_PROD = 'https://pro.com'

export const API_ORIGIN = IS_PROD
  ? API_ORIGIN_PROD
  : (
    IS_DEV
      ? API_ORIGIN_DEV
      : API_ORIGIN_TEST
  )