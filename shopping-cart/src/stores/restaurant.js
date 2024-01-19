import { defineStore } from 'pinia'

const initState = {
    restaurantData: null
}

export const useRestaurantStore = defineStore('restaurant', {
    state: () => {
        return { ...initState }
    },
    getters: {
        getRestaurant: (state) => state.restaurantData
    },
    actions: {
        setRestaurant(restaurant) {
            this.restaurantData = restaurant
        }
    }
})
