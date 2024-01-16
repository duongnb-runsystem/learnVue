import { defineStore } from 'pinia'

const initState = {
    isAuthenticated: false,
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { ...initState }
    },
    getters: {
        // getIsLogin: (state) => state.isLogin,
        // getIsRemember: (state) => state.isRemember,
        // getEmailRegister: (state) => state.emailRegister
    },
    actions: {
        setEmailRegister(email) {
            this.emailRegister = email
        },
        login() {
            this.isAuthenticated = true
        },
        logout() {
            this.isAuthenticated = false
        },

    }
})
