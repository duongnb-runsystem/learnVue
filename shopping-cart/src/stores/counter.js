import { defineStore } from 'pinia'

const initState = {
  count: 0

}

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { ...initState }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
