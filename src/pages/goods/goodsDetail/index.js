/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import utils from '@/utils'

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

  // 分享给朋友 配置 onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() {
    const { loginFlow } = this.props
    let shareParam = {
      invitationCode: loginFlow.userId,
      goodsId: this.$router.params.goodsId,
      redirectTo: '/pages/goods/goodsDetail/index'
    }

    return {
      title: `${loginFlow.userInfo.user.base.nickName} 邀你一起吃喝玩乐`,
      path: `/publiPages/share/index?${utils.parseParam(shareParam)}`,
      imageUrl: 'https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/zy-mp/local/share/shareImg.png',
    }
  }

  render() {
    return (
      <View>3131</View>
    )
  }
}

export default GoodsDetail
