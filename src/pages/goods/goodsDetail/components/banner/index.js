/* 
* 焦点图 广告
*/
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import ossProcess from '@/utils/ossProcess'
import utils from '@/utils'
import './index.scss'

@inject('mainFlow')
@observer

class Banner extends Component {

  static defaultProps = {
    bannerList: []
  }

  state = {
    indicatorDotsIndex: 1
  }

  // 切换banner图改变当前第几张banner
  changeBanner = (currBanner) => {
    this.setState({ indicatorDotsIndex: currBanner.detail.current + 1 })
  }

  render() {
    const { bannerList } = this.props
    const { indicatorDotsIndex } = this.state

    return (
      <View className='bannerWarp'>
        <Swiper className='banner' indicatorColor='#EF3233' indicatorActiveColor='#FFFFFF' circular onChange={this.changeBanner.bind(this)}>
          {
            bannerList.map((img) => {
              return <SwiperItem key={img}>
                <View className='banner-item' onClick={() => { utils.previewImage(bannerList, img) }}>
                  <Image mode='widthFix' src={ossProcess(img, 'resizeFill', { width: 750, height: 750 })} />
                </View>
              </SwiperItem>
            })
          }
        </Swiper>
        <View className='indicatorDots'>{indicatorDotsIndex}/{bannerList.length}</View>
      </View>
    )

  }

}

export default Banner
