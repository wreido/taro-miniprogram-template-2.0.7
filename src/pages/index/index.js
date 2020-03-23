import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import GoodsList from './components/goodsList'
import ShopInfo from './components/shopInfo'
import CateList from './components/cateList'

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

  render() {
    const { nickName, avatarUrl } = this.props.loginFlow.userInfo.leader
    return (
      <View className='indexWarp'>
        <View className='header'>
          {/* 店铺信息 */}
          {(nickName || avatarUrl) && <ShopInfo></ShopInfo>}
          {/* 商品分类 */}
          <CateList></CateList>
        </View>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
        <GoodsList></GoodsList>
      </View>
    )
  }

}

export default Index 
