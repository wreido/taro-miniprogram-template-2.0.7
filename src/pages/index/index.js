import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import $fetch, { $api } from '@/api'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


@inject('counterFlow')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

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
    this.getOrderList()
  }

  //页面隐藏
  componentDidHide() {

  }

  getOrderList = async () => {
    try {
      const { data } = await $fetch($api.orderList, { a: 1 })
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  increment = () => {
    const { counterFlow } = this.props
    counterFlow.increment()
  }

  decrement = () => {
    const { counterFlow } = this.props
    counterFlow.decrement()
  }

  incrementAsync = () => {
    const { counterFlow } = this.props
    counterFlow.incrementAsync()
  }

  render() {
    const { counterFlow: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index 
