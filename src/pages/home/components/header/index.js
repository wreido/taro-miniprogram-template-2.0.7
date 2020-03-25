/* 
* 个人中心 -- header
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow')
@observer

class Header extends Component {

  render() {
    const { nickName, avatarUrl, registerMobile } = this.props.loginFlow.userInfo.user.base
    return (
      <View className='headerWarp'>
        <View className='title'>个人中心</View>
        <View className='userInfo-box'>
          <View className='userInfo'>
            <View className='user-img'>
              <Image mode='aspectFill' src={avatarUrl} />
            </View>
            <View className='user'>
              <View className='name'>{nickName}</View>
              <View className='phone'>{registerMobile}</View>
            </View>
          </View>
          <View className='user-code'><Image mode='aspectFill' src='https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/home/grzx_code.png' /></View>
        </View>
      </View>
    )
  }

}

export default Header
