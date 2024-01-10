<script setup>
import { computed } from 'vue'
const props = defineProps({
    data: Object,
})
const sumCart = computed(() => {
    let sum = 0;
    props.data.forEach(item => {
        sum += item.quantity;
    });
    return sum;
})
const sumPrice = computed(() => {
    let sum = 0;
    props.data.forEach(item => {
        if (item?.discount_price?.text) {
            sum += item.discount_price.value * item.quantity;
        }
        else {
            sum += item.price.value * item.quantity;
        }
    });
    return formatVND(sum);
})
const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
const emit = defineEmits(['removeCart']);
</script>
<template>
    <div class="c-content" v-if="data.length">
        <h1>Cart</h1>
        <div class="c-cart" v-for="item in data">
            <img class="i-thumb" :src="item.photos[1].value" />
            <p class="name">{{ item.name }}</p>
            <p class="quantity">{{ item.quantity }}</p>
            <div class="btn-quatity remove" @click="emit('removeCart', item)">x</div>
        </div>
        <div class="c-sum">
            <p>Số lượng {{ sumCart }} ~ {{ sumPrice }}</p>
        </div>
        <div class="btn-order">
            Order
        </div>
    </div>
</template>
<style scoped lang="scss">
.c-content {
    width: 450px;
    background-color: #fff;
    border-radius: 15px;
    margin-top: 10px;
    padding: 10px 20px;
    align-items: right;
    justify-content: right;
    text-align: left;
}

.btn-order {
    width: 100%;
    height: 50px;
    background-color: #ee4d2d;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.c-sum {
    display: flex;
    justify-content: right;
    align-items: right;
    text-align: right;
}

.c-cart {
    background-color: rgb(242, 242, 242);
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
    justify-content: left;
    gap: 10px;
    height: 50px;
    width: 100%;

    .name {
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        justify-content: left;
    }

    .quantity {
        font-weight: 700;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        justify-content: left;
    }

    .i-thumb {
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .btn-quatity {
        font-size: 22px;
        cursor: pointer;
        font-weight: 700;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        margin-left: auto;
        margin-top: auto;
        margin-bottom: auto;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ee4d2d;
        color: #fff;
    }

    .remove {
        margin-right: 10px;
    }
}
</style>