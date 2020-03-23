/* 
* 商品分类
*/
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from "@tarojs/mobx"

import './index.scss'

@inject('mainFlow')
@observer

class CateList extends Component {

  state = {
    curCateIndex: 0
  }

  changeCate = (index, item) => {
    console.log(item)
    this.setState({ curCateIndex: index })
  }

  render() {
    const { cateList } = this.props.mainFlow
    const { curCateIndex } = this.state
    return (
      <View className='cate-box'>
        {
          cateList.map((item, index) => {
            return <View
              key={item.categoryShowId}
              className={index === curCateIndex ? 'cate-list-item cur' : 'cate-list-item'}
              onClick={this.changeCate.bind(this, index, item)}
            >{item.name}</View>
          })
        }
      </View>
    )
  }

}

export default CateList
