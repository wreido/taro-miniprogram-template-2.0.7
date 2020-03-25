/* 
* 首页 店铺信息
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow')
@observer

class ShopInfo extends Component {

  render() {
    const { avatarUrl, nickName } = this.props.loginFlow.userInfo.leader
    return (
      <View className='shopInfoWarp'>
        {
          (nickName || avatarUrl) && <View className='shopInfo'>
            <Image mode='aspectFill' src={avatarUrl} />
            <Text>{nickName}的小店</Text>
          </View>
        }
      </View>
    )
  }

}

export default ShopInfo
