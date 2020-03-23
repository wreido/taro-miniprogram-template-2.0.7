import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'

const MainFlow = observable({
  cateList: [{ categoryShowId: 0, name: '全部' }],
  advertisement: {},
  //获取 商品分类 广告
  async asyncGetCateOrAdvertisement() {
    try {
      const { data } = await $fetch($api.getCateOrAdvertisement)
      this.cateList = this.cateList.concat(data.categoryShowList)
    } catch (err) {
      console.error('获取 商品分类 广告', err)
    }
  }
})


export default MainFlow