import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import GoodsList from './components/goodsList'
import ShopInfo from './components/shopInfo'
import CateList from './components/cateList'

import './index.scss'

@inject('loginFlow')
@observer

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  //初始化
  componentWillMount() {
    if (this.props.loginFlow.userId) this.props.loginFlow.asyncUpdateUserInfo()
  }

  //Dom渲染完成
  componentDidMount() {

  }

  //组件显示期
  componentDidShow() {

  }

  onReachBottom() {
    console.log(111111111)
  }

  render() {
    return (
      <View className='indexWarp'>
        <View className='header'>
          {/* 店铺信息 */}
          <ShopInfo></ShopInfo>
          <CateList></CateList>
        </View>
        <GoodsList></GoodsList>
      </View>
    )
  }
}

export default Index 
