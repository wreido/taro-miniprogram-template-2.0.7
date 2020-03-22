/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow', 'shareFlow')
@observer

class GoodsDetail extends Component {
  // 配置
  config = {
    navigationBarTitleText: '页面模板',
  }

  state = {}

  //初始化
  componentWillMount() {

  }

  // Dom渲染完成
  componentDidMount() {

  }
  // 组件显示期
  componentDidShow() {
    this.props.loginFlow.asyncUpdateOpenId()
  }


  // 组件销毁期
  componentWillUnmount() {

  }

  // 微信授权一键登录
  getPhoneNumberAuth = async (WXEncryptionKey) => {
    this.props.loginFlow.setWXEncryptionKey(WXEncryptionKey)
    this.props.loginFlow.asyncAuthorizedLogin({
      WXEncryptionKey: this.props.loginFlow.WXEncryptionKey,
      openId: this.props.loginFlow.openId,
      sharePram: this.props.shareFlow.sharePram
    }).then(() => {
      Taro.navigateBack()
    })
  }

  // 手机号登录
  getUserInfoAuth = (WXEncryptionKey) => {
    this.props.loginFlow.setWXEncryptionKey(WXEncryptionKey)
    Taro.navigateTo({ url: '/publiPages/phoneLogin/index' })
  }

  render() {
    return (
      <View className='loginWrap'>
        <View className='head'>
          <View className='ban'>
            <View className='logo'>
              <Image mode='aspectFit' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zhiyou-miniprogram/icon.png' />
            </View>
          </View>
        </View>
        <View className='body'>
          <Button open-type='getPhoneNumber' onGetphonenumber={this.getPhoneNumberAuth}>微信授权一键登录</Button>
          <Button open-type='getUserInfo' onGetUserInfo={this.getUserInfoAuth}>手机号登录</Button>
        </View>
      </View>
    )
  }
}

export default GoodsDetail
