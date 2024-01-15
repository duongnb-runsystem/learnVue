import { defineStore } from 'pinia'

const initState = {
    isLogin: false,
    isRemember: false
}

export const useIsLoginStore = defineStore('isLogin', {
    state: () => {
        return { ...initState }
    },
    getters: {
        getIsLogin: (state) => state.isLogin,
        getIsRemember: (state) => state.isRemember
    },
    actions: {
        setIsRemember(status) {
            this.isRemember = status
        },
        setIsLogin(status) {
            this.isLogin = status
        }
    }
})
