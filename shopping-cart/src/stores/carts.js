import { defineStore } from 'pinia'
const initState = {
    carts: []
};

export const useCartStore = defineStore('carts', {
    state: () => {
        return { ...initState }
    },
    getters: {
        getCarts: (state) => state.carts
    },
    actions: {
        setCarts(carts) {
            this.carts = carts
        },
        updateQuantityCart(item) {
            this.carts.forEach(cart => {
                if (cart.id === item.id) {
                    cart.quantity = item.quantity
                }
            })
        }
    }
})