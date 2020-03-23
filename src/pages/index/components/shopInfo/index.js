/* 
* 店铺信息
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow')
@observer

class ShopInfo extends Component {
  // 配置
  config = {
    navigationBarTitleText: '页面模板',
  }

  state = {}

  //初始化
  componentWillMount() {

  }

  //Dom渲染完成
  componentDidMount() {

  }

  //组件销毁期
  componentWillUnmount() {

  }

  //组件显示期
  componentDidShow() {

  }

  //页面隐藏
  componentDidHide() {

  }

  render() {
    const { avatarUrl, nickName } = this.props.loginFlow.userInfo.leader
    return (
      <View className='shopInfo'>
        <Image mode='aspectFill' src={avatarUrl} />
        <Text>{nickName}的小店</Text>
      </View>
    )
  }
}

export default ShopInfo
