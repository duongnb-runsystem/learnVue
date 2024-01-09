<script setup>
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
    menu: Array,
    querry: String
})

const emit = defineEmits(['showDetailEmit']);

const handleClick = (categoryIndex, itemIndex) => {
    console.log("index emit compoment" + categoryIndex + ' ' + itemIndex);
    emit('showDetailEmit', categoryIndex, itemIndex);
}
</script>
<template>
    <div v-for="(category, categoryIndex) in menu">
        <h1>{{ category.dish_type_name }}</h1>
        <div class="item-menu" v-for="(item, itemIndex) in category.dishes" @click="handleClick(categoryIndex, itemIndex)">
            <img :src="item.photos[1].value">
            <div class="c-infor">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
            </div>
            <div class="c-price">
                <h3 class="lb-price" :class="{ isDiscount: category?.is_group_discount ?? false }">
                    {{ item.price.text }}
                </h3>
                <h3 class="lb-price" v-if="category?.is_group_discount === true ?? false">
                    {{ item.discount_price.text }}
                </h3>
            </div>
            <div class="btn-adding">+</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.item-menu {
    display: flex;
    background-color: #fff;
    border-radius: 15px;
    margin-bottom: 10px;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;

    .btn-adding {
        font-size: 22px;
        cursor: pointer;
        font-weight: 700;
        width: 30px;
        height: 30px;
        display: flex;
        border-radius: 10px;
        margin-left: auto;
        margin-right: 10px;
        align-items: center;
        justify-content: center;
        background-color: #ee4d2d;
        color: #fff;

    }

    .lb-price {
        color: rgb(40, 180, 255);
        font-size: 20px;
    }

    .isDiscount {
        color: #888888;
        font-size: 15px;
        text-decoration: line-through;
    }

    .c-infor {
        width: 65%;
    }

    img {
        width: auto;
        height: auto;
    }
}
</style>