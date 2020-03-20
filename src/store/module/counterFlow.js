import { observable } from 'mobx'

const CounterFlow = observable({
  counter: 0,
  counterFlow() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default CounterFlow