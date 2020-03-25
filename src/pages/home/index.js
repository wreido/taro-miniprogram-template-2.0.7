/* 
* 个人中心
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
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
    Taro.stopPullDownRefresh()
  }

  test = () => {
    Taro.navigateTo({ url: '/publiPages/login/authorizedLogin/index' })
  }

  render() {

    return (
      <View>
        <Header></Header>
        <View onClick={this.test}>登录</View>
      </View>
    )
  }
}

export default GoodsDetail
