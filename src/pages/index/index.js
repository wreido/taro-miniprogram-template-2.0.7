import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import utils from '@/utils'
import ShareModal from '@/components/modal/shareModal'
import UserInfoAuthModal from '@/components/modal/getUserInfoAuthModal'
import GoodsList from './components/goodsList'
import ShopInfo from './components/shopInfo'
import CateList from './components/cateList'
import ShareBtn from './components/shareBtn'

import './index.scss'

@inject('loginFlow', 'mainFlow')
@observer

class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }

  // 初始化
  componentWillMount() {
    // 隐藏右上角分享
    Taro.hideShareMenu()
    // 数据初始化
    this.init()
  }

  // Dom渲染完成
  componentDidMount() {

  }

  // 组件显示期
  componentDidShow() {

  }

  // 下拉事件
  async onPullDownRefresh() {
    // 数据初始化
    await this.init()
    Taro.stopPullDownRefresh()
  }

  // 触底事件
  onReachBottom() {

  }

  // 数据初始化
  init = async () => {
    // 获取用户信息
    if (this.props.loginFlow.userId) await this.props.loginFlow.asyncUpdateUserInfo()
    // 获取商品分类、广告
    this.props.mainFlow.asyncGetCateOrAdvertisement()
  }

  // 分享给朋友 配置 onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() {
    const { loginFlow } = this.props
    let shareParam = {
      invitationCode: loginFlow.userId
    }
    Taro.showTabBar()

    return {
      title: `${loginFlow.userInfo.user.base.nickName} 邀你一起吃喝玩乐`,
      path: `/publiPages/share/index?${utils.parseParam(shareParam)}`,
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

        {/* 获取用户昵称头像 */}
        <UserInfoAuthModal></UserInfoAuthModal>

      </View>
    )
  }

}

export default Index 
