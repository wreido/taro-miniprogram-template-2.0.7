/* 
* 个人中心
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import UserInfoAuthModal from '@/components/modal/getUserInfoAuthModal'
import ShareModal from '@/components/modal/shareModal'
import Header from './components/header'

import './index.scss'

@inject('loginFlow')
@observer

class GoodsDetail extends Component {
  // 配置
  config = {
    navigationBarTitleText: '个人中心',
    enablePullDownRefresh: true,
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#fe5656',
    navigationBarTextStyle: 'white',
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

  // 下拉事件
  async onPullDownRefresh() {
    // 获取用户信息
    if (this.props.loginFlow.userId) await this.props.loginFlow.asyncUpdateUserInfo()
    Taro.stopPullDownRefresh()
  }

  render() {

    return (
      <View>
        {/* 用户信息 */}
        <Header></Header>

        {/* 分享弹框 */}
        <ShareModal entry='index'></ShareModal>

        {/* 获取用户昵称头像 */}
        <UserInfoAuthModal></UserInfoAuthModal>
      </View>
    )
  }
}

export default GoodsDetail
