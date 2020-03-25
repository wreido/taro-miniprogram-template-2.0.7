import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import utils from '@/utils'
import ShareModal from '@/components/modal/shareModal'
import GoodsList from './components/goodsList'
import ShopInfo from './components/shopInfo'
import CateList from './components/cateList'
import ShareBtn from './components/shareBtn'

import './index.scss'

@inject('loginFlow', 'mainFlow')
@observer

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  //初始化
  async componentWillMount() {
    if (this.props.loginFlow.userId) await this.props.loginFlow.asyncUpdateUserInfo()
    this.props.mainFlow.asyncGetCateOrAdvertisement()
  }

  //Dom渲染完成
  componentDidMount() {

  }

  //组件显示期
  componentDidShow() {

  }

  onReachBottom() {

  }

  // 分享给朋友 配置 onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() {
    const { loginFlow } = this.props
    let param = {
      invitationCode: loginFlow.userId
    }
    Taro.showTabBar()

    return {
      title: `${loginFlow.userInfo.user.wxNickName} 邀你一起吃喝玩乐`,
      path: `/publiPages/share/index?${utils.parseParam(param)}`,
      imageUrl: 'https://hsrj.oss-cn-shenzhen.aliyuncs.com/underline/star_shop/share/wx_share.png',
    }
  }

  render() {
    const { nickName, avatarUrl } = this.props.loginFlow.userInfo.leader
    const { cateList } = this.props.mainFlow

    return (
      <View className='indexWarp'>
        <View className='header'>

          {/* 店铺信息 */}
          {(nickName || avatarUrl) && <ShopInfo></ShopInfo>}

          {/* 商品分类 */}
          {(cateList.length > 1) && <CateList></CateList>}

        </View>

        {/* 商品列表 */}
        <GoodsList></GoodsList>

        {/* 分享按钮 */}
        <ShareBtn></ShareBtn>

        {/* 分享弹框 */}
        <ShareModal></ShareModal>

      </View>
    )
  }

}

export default Index 
