/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow')
@observer

class GoodsDetail extends Component {
  // 配置
  config = {
    navigationBarTitleText: '我的',
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

  }


  // 组件销毁期
  componentWillUnmount() {

  }


  test = () => {
    Taro.navigateTo({ url: '/publiPages/login/authorizedLogin/index' })
  }

  render() {
    return (
      <View>
        <View onClick={this.test}>登录</View>
      </View>
    )
  }
}

export default GoodsDetail
