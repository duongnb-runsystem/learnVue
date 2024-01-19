<template>
    <div class="c-content-restaurent">
        <div class="c-all-restaurent">
            <div class="item-restaurent" @click="chooseRestaurant(item)" v-for="item in restaurant"
                :id="item.restaurant_id">
                <img class="img-restaurent" :src="item.photos[4].value">
                <p class="name-restaurent">{{ item.name }}</p>
                <p class="address-restaurent">{{ item.address }}</p>
                <hr />
                <div class="c-voucher">
                    <img class="img-voucher" :src="(item.promotion_groups[0]).icon" />
                    <p class="promotion-restaurent">{{ (item.promotion_groups[0]).text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import service from '@/services/axios.service'
import router from '@/router/index';
import { useRestaurantStore } from '@/stores/restaurant.js';

const restaurant = ref([]);

onMounted(() => {
    getDataAllRestaurant();
})
const getDataAllRestaurant = async () => {
    const url = 'https://gappapi.deliverynow.vn/api/delivery/get_infos';
    const data = { "restaurant_ids": [11349, 171903, 13831, 1121420, 777457, 128384, 247390, 47168, 47293, 1630, 98797, 188485, 697938, 126552, 177965, 9348, 957846, 5160, 1148, 100424, 273297, 7071, 662933, 88504, 1021507] };
    let rs = await service.post('api/delivery/get_infos', data);
    restaurant.value = rs.data.reply.delivery_infos;
}
const chooseRestaurant = (item) => {

    useRestaurantStore().setRestaurant(item);
    router.push('/shop');
}
</script>

<style lang="scss">
@import './styles.scss';
</style>