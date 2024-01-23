<template>
    <div class="c-content-restaurent">
        <div class="c-input">
            <div class="c-input-search">
                <input class="f-search" v-model="searchShop" @keydown="keyDownSearch"
                    placeholder="Tìm địa điểm, món ăn, địa chỉ...">
                <div class="btn-search" @click="searchClick">
                    <font-awesome-icon class="ic-search" icon="magnifying-glass" @click="searchRestaurant" />
                </div>
            </div>
        </div>
        <div class="c-content-error" v-if="searchError">
            <div class="c-error-search">
                <p class="lb-error">Không tìm thấy kết quả ...</p>
            </div>
        </div>
        <div class="c-all-restaurent" v-else>
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
import { useCommonStore } from '@/stores/_common.js';
const restaurant = ref([]);
const searchShop = ref('');
const searchError = ref(false);
onMounted(() => {
    const searchRestaurant = localStorage.getItem('searchRestaurant');
    if (searchRestaurant === null)
        getDataAllRestaurant();
    else {
        searchShop.value = searchRestaurant;
        getDataBySearchRestaurant();
    }
})
const getDataAllRestaurant = async () => {
    // const url = 'https://gappapi.deliverynow.vn/api/delivery/get_infos';
    const data = { "restaurant_ids": [11349, 171903, 13831, 1121420, 777457, 128384, 247390, 47168, 47293, 1630, 98797, 188485, 697938, 126552, 177965, 9348, 957846, 5160, 1148, 100424, 273297, 7071, 662933, 88504, 1021507] };
    let rs = await service.post('api/delivery/get_infos', data);
    restaurant.value = rs.data.reply.delivery_infos;

}
const getDataBySearchRestaurant = async () => {
    useCommonStore().setLoading(true);
    restaurant.value = [];
    // const url = 'https://gappapi.deliverynow.vn/api/delivery/search_global';
    const data = { "category_group": 1, "city_id": 217, "delivery_only": true, "keyword": searchShop.value, "sort_type": 8, "foody_services": [1], "full_restaurant_ids": true };
    let rs = await service.post('api/delivery/search_global', data);
    if (rs !== null && rs.data.reply.search_result.length > 0) {
        const restaurantIds = rs.data.reply.search_result[0].restaurant_ids;
        const list25Restaurant = restaurantIds.slice(0, 25);
        const dataPostRestaurant = { "restaurant_ids": list25Restaurant };
        let rsGetRestaurant = await service.post('api/delivery/get_infos', dataPostRestaurant);
        restaurant.value = rsGetRestaurant.data.reply.delivery_infos;
        searchError.value = false;
    }
    else
        searchError.value = true;
    useCommonStore().setLoading(false);
}
const chooseRestaurant = (item) => {
    useRestaurantStore().setRestaurant(item);
    router.push('/shop');
}
const searchRestaurant = () => {
    localStorage.setItem('searchRestaurant', searchShop.value);
    getDataBySearchRestaurant();
}
const keyDownSearch = (e) => {
    if (e.key === 'Enter') {
        searchRestaurant();
    }
}
</script>

<style lang="scss">
@import './styles.scss';
</style>