<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { formatVND, calculateTotal } from '@/core/utils/common';
const isCollaps = ref(false);
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
    return calculateTotal(props.data, false);
})

const emit = defineEmits(['removeCart', 'orderCart', 'sortCart']);
const totalPrice = computed(() => {
    return calculateTotal(props.data, true);
})



</script>
<template>
    <div class="c-content" v-if="data?.length">
        <div class="c-header">
            <h1>Giỏ hàng</h1>
            <p class="lb-cart" v-if="isCollaps">{{ sumCart }} </p>
            <font-awesome-icon class="fa-sort" v-if="!isCollaps" @click="emit('sortCart')" icon="sort" />
            <font-awesome-icon class="fa-collap" :class="{ rotated: isCollaps }" icon="chevron-up"
                @click="isCollaps = !isCollaps" />
        </div>
        <div class="collapsible" :class="{ collapCart: !isCollaps }">
            <div class="c-list-cart">
                <div class="c-cart" :id="item.id" v-for="item in data">
                    <img class="i-thumb" :src="item.photos[1].value" />
                    <p class="name">{{ item.name }}</p>
                    <p class="quantity">{{ item.quantity }}</p>
                    <div class="btn-quatity remove" @click="emit('removeCart', item)">x</div>
                </div>
            </div>
            <div class="c-priceShip">
                <p class="lb-titlePrice"> Tổng cộng ({{ sumCart }} món)</p>
                <p class="lb-price">{{ sumPrice }}</p>
            </div>
            <p>Địa chỉ : Số 2 Hồng Hà, phường 2, Tân Bình, TP.HCM</p>
            <div class="c-priceShip">
                <p class="lb-titlePrice">Phí giao hàng(0.2km) </p>
                <p class="lb-price">{{ formatVND(15000) }}</p>
            </div>
            <div class="c-priceShip">
                <p class="lb-titlePrice">Tổng cộng </p>
                <p class="lb-price">{{ totalPrice }}</p>
            </div>
            <div class="btn-order" @click="emit('orderCart')">
                Đặt hàng ({{ totalPrice }})
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.c-list-cart {
    overflow-y: auto;
    max-height: 300px;
}

.fa-sort {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid transparent;
}

.fa-sort:hover {
    color: #ee4d2d;
    border: 1px solid #ee4d2d;
}

.lb-cart {
    margin-left: 10px;
    color: #fff;
    font-weight: 700;
    background-color: #ee4d2d;
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    border-radius: 15px;
    padding-left: 10px;
    padding-right: 10px;
}

.c-title-cart {
    position: relative;
}

.fa-collap {
    width: 20px;
    height: 20px;
    margin-left: auto;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.rotated {
    transform: rotate(180deg);
}

.c-header {
    display: flex;
    align-items: center;
    text-align: center;
}

.c-priceShip {
    justify-content: space-between;
    display: flex;
    align-items: right;
    text-align: right;
}

.lb-titlePrice {
    font-weight: 700;
}

.lb-price {
    font-weight: 700;
    color: #ee4d2d;
}

.c-content {
    top: 0;
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

.collapsible {
    height: 0;
    transition: height 0.5s ease-out;
    overflow: hidden;
    transition: height 0.5s ease-out;
    visibility: hidden;
    transition: visibility 0.5s ease-out;

}

.collapCart {
    height: auto;
    visibility: visible;
}

.c-cart {
    background-color: rgb(242, 242, 242);
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
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