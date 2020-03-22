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
      Taro.showLoading({ mask: true, title: '加载中' })
      const { code } = await Taro.login()
      const { data } = await $fetch($api.getOpenId, { code, appType: enumList.appType })
      Taro.hideLoading()
      this.openId = data
      Taro.setStorageSync('openId', this.openId)
    } catch (err) {
      console.error('获取openId', err)
    }
  },
  //更新微信加密串
  updateWXEncryptionKey(WXEncryptionKey) {
    this.WXEncryptionKey = WXEncryptionKey
  },
  //登录
  async authorizedLogin(option) {
    try {
      Taro.showLoading({ mask: true, title: '加载中' })
      const { WXEncryptionKey, openId, sharePram, mobileIn, mobileCode } = option
      let param = {
        appType: enumList.appType,
        openId,
        ivData: WXEncryptionKey.detail.iv,
        encryptedData: WXEncryptionKey.detail.encryptedData,
        invitationCode: sharePram.invitationCode || '',
        mobileIn,
        mobileCode
      }
      const { data } = await $fetch($api.login, param)
      Taro.hideLoading()
      this.userId = data
      Taro.setStorageSync('userId', this.userId)
      this.asyncUpdateUserInfo(this.userId, openId)
    } catch (err) {
      console.log('登录', err)
      await this.asyncUpdateOpenId()
    }
  },
  //获取用户信息
  async asyncUpdateUserInfo(userId, openId) {
    try {
      Taro.showLoading({ mask: true, title: '加载中' })
      const user = await $fetch($api.getuserInfo, {}, { loading: true, header: { userId } })
      let leader = await $fetch($api.getLeaderInfo, { memberId: user.data.fakeHeadId }, { loading: true, header: { userId } })
      Taro.hideLoading()
      this.userInfo = { user: user.data, leader: leader.data, openId }
      Taro.setStorageSync('userInfo', this.userInfo)
    } catch (err) {
      console.error('获取用户信息', err)
    }
  }
})
export default LoginFlow