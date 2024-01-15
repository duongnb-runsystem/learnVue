import { defineStore } from 'pinia'
const initState = {};

export const useCounterStore = defineStore('carts', {
    state: () => {
        return { ...initState }
    },
    getters: {
        getCarts: (state) => state.carts
    },
    actions: {
        increment() {
            this.count++
        },
        updateQuantityCart(item) {
            let existItem = this.carts.find((itemCart) => itemCart.id === item.id);
        }
    }
})