/* 
* 焦点图 广告
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCountdown } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

@inject('mainFlow')
@observer

class GoodsInfo extends Component {

  static defaultProps = {
    goodsDetail: {}
  }

  render() {
    const { goodsDetail } = this.props

    return (
      <View className='goodsInfoWarp'>
        <View className='price'>
          <View className='price-info'>
            <View className='price-info-l'><Text>￥</Text>{goodsDetail.priceRange}</View>
            <View className='price-info-r'>
              <View className='item'>￥{goodsDetail.originalPrice}</View>
              <View className='item'>还剩 {goodsDetail.usableQty}件/已售{goodsDetail.salesCount}件</View>
            </View>
          </View>

          <View className='price-time will-end'>
            {goodsDetail.status !== -1 && <View className='item'>{goodsDetail.goodsStatus ? '距开抢' : '即将结束'}</View>}
            {goodsDetail.status === -1 && <View className='item'>已结束</View>}
            <View className='item'>
              {goodsDetail.status !== -1 && goodsDetail.time && goodsDetail.time.day > 0 && <AtCountdown isShowDay format={{ day: '天', hours: ':', minutes: ':', seconds: '' }} day={goodsDetail.time.day} hours={goodsDetail.time.hours} minutes={goodsDetail.time.minutes} seconds={goodsDetail.time.seconds} onTimeUp={() => { }} />}
              {goodsDetail.status !== -1 && goodsDetail.time && goodsDetail.time.day === 0 && <AtCountdown format={{ hours: ':', minutes: ':', seconds: '' }} hours={goodsDetail.time.hours} minutes={goodsDetail.time.minutes} seconds={goodsDetail.time.seconds} onTimeUp={() => { }} />}
            </View>
          </View>
        </View>

        <View className='goods-info'>
          <View className='goods-title'>
            <View className='goods-name'>{goodsDetail.title}</View>
            <View className='share-btn' onClick={this.invitation.bind(this)}></View>
          </View>
          <View className='goods-labelled parcelGood'>包邮到家</View>
          {
            goodsDetail.tagShowVOList.length > 0 && goodsDetail.tagShowVOList.map((item) => {
              return <View className='goods-labelled' key={item.tagId}>{item.name}</View>
            })
          }
          <View className='goods-tip'>
            <View className='goods-tip-text'>下单付款后，由供应商72小时内发货，特殊商品及特定时段除外</View>
          </View>
        </View>
      </View>
    )

  }

}

export default GoodsInfo
