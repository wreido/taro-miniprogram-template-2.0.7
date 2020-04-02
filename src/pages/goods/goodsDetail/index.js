/* 
* 顶层视图 应用顶层
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import $fetch, { $api } from '@/api'
import utils from '@/utils'
import Bus, { BusType } from '@/bus'
import ShareModal from '@/components/modal/shareModal'
import Banner from './components/banner'
import Profit from './components/profit'
import GoodsInfo from './components/goodsInfo'
import ShopInfo from './components/shopInfo'

import './index.scss'

@inject('loginFlow')
@observer

class GoodsDetail extends Component {
  // 配置
  config = {
    navigationBarTitleText: '商品详情',
    enablePullDownRefresh: true
  }

  state = {
    goodsDetail: {},//商品详情
    goodsDetailHtml: ''
  }

  //Dom渲染完成
  componentDidMount() {
    // 隐藏右上角分享
    Taro.hideShareMenu()
    this.getGoodsDetail()
    Bus.on(BusType.refreshGoodsDetail, () => { this.init() })

  }

  // 组件销毁期
  componentWillUnmount() {
    Bus.off(BusType.refreshGoodsDetail)
  }

  // 下拉事件
  async onPullDownRefresh() {
    this.init()
    Taro.stopPullDownRefresh()
  }

  // 数据初始化
  init = async () => {
    // 获取用户信息
    if (this.props.loginFlow.userId) await this.props.loginFlow.asyncUpdateUserInfo()
    //商品详情
    this.getGoodsDetail()
  }

  //商品详情
  getGoodsDetail = async () => {
    try {
      const { data } = await $fetch($api.getGoodsDetail, { goodId: this.$router.params.goodsId })
      let startTime = data.goodsSalesBeginTime - data.currentTime > 0 ? data.goodsSalesBeginTime : data.goodsSalesEndTime
      const time = {
        day: utils.timeSpan(startTime, data.currentTime, 'd'),
        hours: utils.timeSpan(startTime, data.currentTime, 'h'),
        minutes: utils.timeSpan(startTime, data.currentTime, 'm'),
        seconds: utils.timeSpan(startTime, data.currentTime, 's')
      }
      if (data.goodsDetailOss) this.getGoodsDetailHtml(data.goodsDetailOss)
      this.setState({ goodsDetail: { ...data, time, goodsStatus: data.goodsSalesBeginTime - data.currentTime > 0 } })
    } catch (err) {
      console.log('商品详情', err)
    }
  }

  getGoodsDetailHtml = async (goodsDetailOss) => {
    try {
      const { data } = await $fetch($api.getGoodsDetailHtml, { html: goodsDetailOss })
      this.setState({ goodsDetailHtml: data })
    } catch (err) {
      console.log('商品详情', err)
    }
  }


  // 分享给朋友 配置 onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() {
    const { loginFlow } = this.props
    const { goodsDetail } = this.state
    let shareParam = {
      invitationCode: loginFlow.userId,
      goodsId: this.$router.params.goodsId,
      redirectTo: '/pages/goods/goodsDetail/index'
    }

    return {
      title: `${loginFlow.userInfo.user.base.nickName} 邀你一起吃喝玩乐`,
      path: `/publiPages/share/index?${utils.parseParam(shareParam)}`,
      imageUrl: `${goodsDetail.detailImages[0]}`,
    }
  }

  render() {
    const { goodsDetail, goodsDetailHtml } = this.state

    return (
      <View className='goodsDetailWarp'>
        <View className='header'>
          {/* 商品图 */}
          <Banner bannerList={goodsDetail.detailImages}></Banner>
          {/* 收益 */}
          <Profit goodsDetail={goodsDetail}></Profit>
        </View>

        {/* 商品信息 */}
        <GoodsInfo goodsDetail={goodsDetail}></GoodsInfo>

        {/* 店铺信息 */}
        <ShopInfo></ShopInfo>

        <rich-text space='nbsp' nodes={goodsDetailHtml}></rich-text>

        {/* 分享弹框 */}
        <ShareModal entry='goods'></ShareModal>

      </View>
    )
  }
}

export default GoodsDetail
