import { defineStore } from 'pinia'

const initState = {
    isLogin: false,
    isRemember: false,
    emailRegister: '',
}

export const useIsLoginStore = defineStore('isLogin', {
    state: () => {
        return { ...initState }
    },
    getters: {
        getIsLogin: (state) => state.isLogin,
        getIsRemember: (state) => state.isRemember,
        getEmailRegister: (state) => state.emailRegister
    },
    actions: {
        setEmailRegister(email) {
            this.emailRegister = email
        }
    }
})
