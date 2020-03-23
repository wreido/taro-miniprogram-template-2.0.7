/**
 * 首页 热门推荐商品 组件
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Icon, Button } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"
import './index.scss'

@inject('loginFlow', 'shareFlow')
@observer
class ShareModal extends Component {

  static defaultProps = {
    // 父级组件来源 (必传)  index:首页  goods:商品
    entry: '',
    // 拓展参数 非通用
    extraData: {}
  }

  state = {}

  // Dom渲染完成
  componentDidMount() { }
  // 组件显示期
  componentDidShow() {
    this.props.shareFlow.showShareModal = false
  }
  // 组件销毁期
  componentWillUnmount() {
    this.props.shareFlow.showShareModal = false
  }
  // 销毁
  componentDidHide() {
    this.props.shareFlow.showShareModal = false
  }

  // 分享给朋友 配置  onShareAppMessage钩子函数必须放父级组件,子组件内无效
  onShareAppMessage() { }

  // 分享朋友圈 生成海报
  hanldShareQuan = () => {
    const { entry, shareFlow, extraData } = this.props
    if (!entry) return

    switch (entry) {
      case 'index': // 首页
        shareFlow.createHomePoster()
        break;
      case 'goods': // 商品 必须传商品ID、商品图片
        shareFlow.createGoodsPoster({ goodsId: extraData.spuId, goodImgs: extraData.goodImgs[0], tppposter: extraData.tppposter })
        break;
    }

    shareFlow.showShareModal = true
    this.closeShareModal()
  }

  // 保存海报
  handleSavePoster = () => {
    const _that = this
    Taro.getSetting({
      success(data) {
        // 已授权相册
        if (JSON.stringify(data.authSetting) == '{}' || data.authSetting['scope.writePhotosAlbum'] == void 0 || data.authSetting['scope.writePhotosAlbum']) {
          Taro.saveImageToPhotosAlbum({
            filePath: _that.props.shareFlow.posterImgUrl,
            success() {
              Taro.showToast({ title: '图片保存成功,快去分享给好友吧', icon: 'none', duration: 1000 })
              _that.props.shareFlow.showSharePosterModal = false
            }
          })
        } else {
          // 重新授权
          Taro.openSetting()
        }
      }
    })
  }

  // 关闭分享弹窗
  closeShareModal = () => {
    this.props.shareFlow.showShareModal = false
    Taro.showTabBar()
  }

  // 关闭分享海报弹窗
  closeSharePosterModal = () => {
    this.props.shareFlow.showSharePosterModal = false
  }

  render() {
    const { showShareModal, showSharePosterModal, posterImgUrl } = this.props.shareFlow
    return (
      <View className='shareModalWrap'>
        {
          showSharePosterModal && <View className='posterModal' catchtouchmove='ture'>
            <View className='posterImg'>
              <Image src={posterImgUrl} />
              <View className='close' onClick={() => { this.closeSharePosterModal() }}></View>
            </View>
            <View className='save' title='保存图片' onClick={() => { this.handleSavePoster() }}>保存图片</View>
          </View>
        }

        {showShareModal && (<View className='shareWrapper'>
          <View className='modal_mask' onClick={() => { this.closeShareModal() }}></View>
          <View className='shareModal'>
            <View className='head'>分享给好友，TA购买你将得收益</View>
            <View className='body'>
              <Button className='item shareFriend' openType='share' title='分享微信好友' >
                <View className='icon'><Icon></Icon></View>
                <View className='text'><Text>分享给好友</Text></View>
              </Button>
              <Button className='item shareQuan' onClick={() => { this.hanldShareQuan() }} title='生成海报分享朋友圈'>
                <View className='icon'><Icon></Icon></View>
                <View className='text'><Text>生成图片</Text></View>
              </Button>
            </View>
            <View className='foot' onClick={() => { this.closeShareModal() }}>取消</View>
          </View>
        </View>
        )}
      </View>
    )
  }
}

export default ShareModal
