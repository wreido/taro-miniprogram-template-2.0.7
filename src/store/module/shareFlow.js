/* 
* 分享流程  影响流程：登录、下单、分享
*/
import { observable } from "mobx";

const ShareFlow = observable({
  showShareModal: false,// 分享模态框状态
  showSharePosterModal: false,// 是否显示所有生成的海报弹层
  shareParm: {},// 分享参数 
  // 首页海报
  async createHomePoster() {
    this.showSharePosterModal = true
    this.showShareModal = false
  },
  // 商品海报
  async createGoodsPoster() {
    this.showSharePosterModal = true
    this.showShareModal = false
  }
})

export default ShareFlow
