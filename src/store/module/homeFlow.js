import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import $fetch, { $api } from '@/api'

const HomeFlow = observable({
  balance: '0.00',//商品分类
  //获取 余额
  async asyncGetMyBalance() {
    try {
      const { data: { data } } = await $fetch($api.getMyBalance)
      this.balance = data.balance
    } catch (err) {
      console.error('余额', err)
    }
  }
})


export default HomeFlow