/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('loginFlow')
@observer

class GoodsDetail extends Component {
  // 配置
  config = {
    navigationBarTitleText: '商品详情',
  }

  state = {}

  //初始化
  componentWillMount() {

  }

  //Dom渲染完成
  componentDidMount() {

  }

  render() {
    return (
      <View>3131</View>
    )
  }
}

export default GoodsDetail
