import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import GoodsList from './components/goodsList'

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

  //组件显示期
  componentDidShow() {

  }

  increment = () => {
    this.props.counterFlow.increment()
  }

  decrement = () => {
    this.props.counterFlow.decrement()
  }

  incrementAsync = () => {
    this.props.counterFlow.incrementAsync()
  }

  onReachBottom() {
    this.props.counterFlow.incrementAsync()
  }

  render() {
    const { counterFlow: { counter } } = this.props
    return (
      <View className='index'>
        <GoodsList type={counter}></GoodsList>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index 
