/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

@inject('shareFlow')
@observer

class GoodsDetail extends Component {

  config = {
    navigationBarTitleText: '分享'
  }

  // 组件显示期
  componentDidShow() {
    this.props.shareFlow.setShareParm(this.$router.params)
  }

  render() {
    return (
      <View></View>
    )
  }
}

export default GoodsDetail
