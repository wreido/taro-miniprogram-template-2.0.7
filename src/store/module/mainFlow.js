import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'

const MainFlow = observable({
  cateList: [],//商品分类
  advertisement: {},//广告
  currCate: { categoryShowId: 0, name: '全部' },//当前分类
  goodsList: [],//商品列表
  //获取 商品分类 广告
  async asyncGetCateOrAdvertisement() {
    try {
      const { data } = await $fetch($api.getCateOrAdvertisement)
      if (data.adsHomePageGroup) this.advertisement = data.adsHomePageGroup
      if (data.categoryShowList) this.cateList = [{ categoryShowId: 0, name: '全部' }].concat(data.categoryShowList)
      if (JSON.stringify(this.currCate) === '{}') this.currCate = this.cateList[0]
    } catch (err) {
      console.error('获取 商品分类 广告', err)
    }
  },
  //获取商品列表
  async asyncGetGoodsList() {
    let param = {
      categoryShowId: this.currCate.categoryShowId
    }
    try {
      const { data } = await $fetch($api.getGoodsList, param)
      this.goodsList = data.content
    } catch (err) {
      console.error('商品列表', err)
    }
  },
  //当前选择中分类
  async setCurrCate(cate) {
    this.currCate = cate
    await this.asyncGetGoodsList()
  }
})


export default MainFlow