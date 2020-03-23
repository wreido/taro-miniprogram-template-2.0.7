/* 
* 商品列表
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import $fetch, { $api } from '@/api'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('loginFlow')
@observer

class GoodsDetail extends Component {

  static defaultProps = {
    type: 1
  }

  //获取商品列表
  getGoodsList = async (type) => {
    try {
      const { data } = await $fetch($api.getGoodsList, { type })
      this.setState(prevState => ({ a: prevState.a.concat(data) }))
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { type } = this.props
    return (
      <View className='goodsListWarp'>{type}</View>
    )
  }

}

export default GoodsDetail
