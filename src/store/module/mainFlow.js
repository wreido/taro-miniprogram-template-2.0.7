import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'

const MainFlow = observable({
  cateList: [],//商品分类
  advertisement: {},//广告
  //获取 商品分类 广告
  async asyncGetCateOrAdvertisement() {
    try {
      const { data } = await $fetch($api.getCateOrAdvertisement)
      this.cateList = [{ categoryShowId: 0, name: '全部' }].concat(data.categoryShowList)
    } catch (err) {
      console.error('获取 商品分类 广告', err)
    }
  },
})


export default MainFlow