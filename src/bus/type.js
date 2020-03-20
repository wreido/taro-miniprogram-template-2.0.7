/*
 * 消息机制
 * @example
 * 
 * Bus.on(BusType.test, (data) => { console.long(data) })
 * Bus.on(BusType.test, (data) => { console.long(data) })
 * 
*/

const type = Object.create(null)

// test
type.test = 'TEST'

export default type
