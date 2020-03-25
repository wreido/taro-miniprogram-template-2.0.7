/* 
* 分享流程  影响流程：登录、下单、分享
*/
import Taro from '@tarojs/taro'
import { observable } from "mobx";

const ShareFlow = observable({
  showShareModal: false,// 分享模态框状态
  showSharePosterModal: false,// 是否显示所有生成的海报弹层
  posterImgUrl: '',//海报
  shareParm: {},// 分享参数 
  // 设置分享参数
  setShareParm(param) {
    this.shareParm = param
    console.log(11111, this.shareParm)
  },
  // 首页海报
  async createHomePoster() {
    this.posterImgUrl = 'https://img.alicdn.com/imgextra/i2/913662479/O1CN01lbR64R1UBQR0rKACF_!!913662479.jpg'
    this.showSharePosterModal = true
    this.showShareModal = false
  },
  // 商品海报
  async createGoodsPoster() {
    this.posterImgUrl = 'https://img.alicdn.com/imgextra/i2/913662479/O1CN01lbR64R1UBQR0rKACF_!!913662479.jpg'
    this.showSharePosterModal = true
    this.showShareModal = false
  }
})

export default ShareFlow
