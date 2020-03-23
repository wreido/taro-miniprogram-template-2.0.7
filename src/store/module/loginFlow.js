/* 
* 登录
*/
import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'
import enumList from '@/utils/enumList'

const LoginFlow = observable({
  userId: Taro.getStorageSync('userId'),//userId
  openId: Taro.getStorageSync('openId'),//openId
  WXEncryptionKey: {},//微信加密串
  userInfo: {
    user: {},
    leader: {},
    openId: '',
    ...Taro.getStorageSync('userInfo')
  },
  //获取openId
  async asyncUpdateOpenId() {
    try {
      const { code } = await Taro.login()
      const { data } = await $fetch($api.getOpenId, { code, appType: enumList.appType })
      this.openId = data
      Taro.setStorageSync('openId', this.openId)
    } catch (err) {
      console.error('获取openId', err)
    }
  },
  //更新微信加密串
  setWXEncryptionKey(WXEncryptionKey) {
    this.WXEncryptionKey = WXEncryptionKey.detail
  },
  //登录
  async asyncAuthorizedLogin(option) {
    return new Promise(async (resolve, reject) => {
      try {
        const { WXEncryptionKey, openId, shareParm, mobileIn, mobileCode } = option
        let param = {
          appType: enumList.appType,
          openId,
          ivData: WXEncryptionKey.iv,
          encryptedData: WXEncryptionKey.encryptedData,
          invitationCode: shareParm.invitationCode || '',
          mobileIn,
          mobileCode
        }
        const { data } = await $fetch($api.login, param, { loadingOps: { loading: true, loadingText: '登录中...' } })
        this.userId = data
        Taro.setStorageSync('userId', this.userId)
        await this.asyncUpdateUserInfo()
        resolve(this.userInfo)
      } catch (err) {
        console.log('登录', err)
        reject(err)
      }
    })
  },
  //获取用户信息
  async asyncUpdateUserInfo() {
    try {
      const user = await $fetch($api.getuserInfo)
      let leader = await $fetch($api.getLeaderInfo, { memberId: user.data.fakeHeadId })
      this.userInfo = { user: user.data, leader: leader.data, openId: this.openId }
      Taro.setStorageSync('userInfo', this.userInfo)
    } catch (err) {
      console.error('获取用户信息', err)
    }
  }
})
export default LoginFlow