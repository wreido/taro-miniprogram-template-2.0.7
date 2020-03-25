import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import $fetch, { $api } from '@/api'


export default {
  /**
  * @Title 随机生成字符串
  * @param len  生成字符串长度
  */
  randomString(len = 32) {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const maxPos = $chars.length
    let str = ''
    let i = 0
    while (i < len) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
      i++
    }
    return str
  },

  /**
  * @Title 日期格式化   YYYY/MM/dd HH:mm:ss
  * @param dateStr     日期
  * @param formatType  格式化类型
  */
  formatDate(dateStr = '', formatType = 'YYYY/MM/dd HH:mm:ss') {
    return dayjs(dateStr).format(formatType)
  },

  /**
  * @Title 距离时间间隔
  * @param time  时间戳
  * @param currTimestamp  当前时间
  * @param type  显示类型
  */
  timeSpan(time, currTimestamp, type) {
    // let currTimestamp = Date.parse(new Date())
    //计算出天数
    let days = Math.floor((time - currTimestamp) / (24 * 3600 * 1000))
    //计算出小时数
    let leave1 = (time - currTimestamp) % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)
    switch (type) {
      case 'd':
        return days
      case 'h':
        return hours
      case 'm':
        return minutes
      case 's':
        return seconds
    }
  },

  /**
  * @Title 支付
  * @param payment  支付参数 {tradeNo,orderId,actualAmount,type} {交易号, 订单id, 实付金额,跳转类型（1需要跳转订单详情 0不跳转）)}
  */
  async pay({ tradeNo, orderId, actualAmount, type = 0 }) {
    let that = this
    try {
      const { data } = await $fetch($api.getPayment, {
        openId: Taro.getStorageSync('openId'),
        tradeNo: tradeNo,
        tradeType: 'WX-JSAPI',
      })

      let wxPayment = JSON.parse(data)

      Taro.requestPayment({
        timeStamp: wxPayment.timeStamp,
        nonceStr: wxPayment.nonceStr,
        package: wxPayment.package,
        signType: wxPayment.signType,
        paySign: wxPayment.paySign,
        success() {
          Taro.redirectTo({ url: `/pages/paySuccess/index?orderId=${orderId}&actualAmount=${actualAmount}` })
        },
        fail() {
          Taro.showModal({
            title: "确定放弃付款吗？",
            content: "您尚未完成支付，喜欢的商品可能会被抢空哦~",
            cancelText: "暂时放弃",
            confirmText: "继续支付",
            cancelColor: "#ccc",
            confirmColor: "#ff7113"
          }).then(res => {
            if (res.confirm) {
              that.pay({ tradeNo, orderId, actualAmount, type })
            } else {
              if (type) Taro.redirectTo({ url: `/pages/order/orderDetail/index?orderId=${orderId}` })
            }
          })
        }
      })

    } catch (err) {
      console.error('支付凭证', err)
    }
  },

  /**
  * @Title 数组切割成等长的多个数组
  * @param array 切割数组
  * @param subGroupLength 切割长度
  */
  arryGroup(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
  },

  /**
  * @Title json转url参数
  * @param param 
  */
  parseParam(param) {
    let string = ''
    for (let key in param) {
      let str = `${key}=${param[key]}&`
      string = string + str
    }
    return string.slice(0, string.length - 1)
  }
}
