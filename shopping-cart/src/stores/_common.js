import { defineStore } from 'pinia'

const initState = {
  loading: false
}

export const useCommonStore = defineStore('common', {
  state: () => {
    return { ...initState }
  },
  actions: {
    setLoading(status) {
      this.loading = status
    }
  }
})
