/*
 * 消息机制
 * @example
 * 
 * Bus.on(BusType.refreshHome, (data) => { console.long(data) })
 * Bus.trigger(BusType.refreshHome)
 * 
*/

const type = Object.create(null)

// test
type.refreshHome = 'home'

export default type
