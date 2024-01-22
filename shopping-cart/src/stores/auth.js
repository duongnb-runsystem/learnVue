import { defineStore } from 'pinia'

const initState = {
    emailRegister: '',
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { ...initState }
    },
    getters: {
        getEmailRegister: (state) => state.emailRegister,
    },
    actions: {
        setEmailRegister(email) {
            this.emailRegister = email
        },
    }
})
