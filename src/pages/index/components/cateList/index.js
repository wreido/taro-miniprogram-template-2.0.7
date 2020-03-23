/* 
* 店铺信息
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow')
@observer

class CateList extends Component {
  // 配置
  config = {
    navigationBarTitleText: '页面模板',
  }

  state = {}

  //初始化
  componentWillMount() {

  }

  //Dom渲染完成
  componentDidMount() {

  }

  //组件销毁期
  componentWillUnmount() {

  }

  //组件显示期
  componentDidShow() {

  }

  //页面隐藏
  componentDidHide() {

  }

  render() {
    return (
      <View className='cate-box'>
        <View className='cate-list-item cur'>123113</View>
        <View className='cate-list-item'>123113</View>
        <View className='cate-list-item'>123113</View>
        <View className='cate-list-item'>123113</View>
        <View className='cate-list-item'>123113</View>
        <View className='cate-list-item'>123113</View>
        <View className='cate-list-item'>123113</View>
        <View className='cate-list-item'>123113</View>
      </View>
    )
  }
}

export default CateList
