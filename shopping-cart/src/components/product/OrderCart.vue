<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <h1>Xác nhận đơn hàng</h1>
                <div class="c-cart" v-for="item in data">
                    <img class="i-thumb" :src="item.photos[1].value" />
                    <p class="name">{{ item.name }}</p>
                    <div class="c-quantity">
                        <p class="lb-titlePrice">Số lượng </p>
                        <p class="lb-price">{{ item.quantity }}</p>
                    </div>
                </div>
                <div class="c-priceShip">
                    <p class="lb-titlePrice"> Tổng cộng ({{ sumCart }} món)</p>
                    <p class="lb-price">{{ sumPrice }}</p>
                </div>
                <div class="c-priceShip">
                    <p class="lb-titlePrice">Phí giao hàng(0.2km) </p>
                    <p class="lb-price">{{ formatVND(15000) }}</p>
                </div>
                <div class="c-priceShip">
                    <p class="lb-titlePrice">Tổng cộng </p>
                    <p class="lb-price">{{ totalPrice }}</p>
                </div>
                <div class="col-btn">
                    <button class="btn-add" @click="emit('confirm')"> Xác nhận ({{ totalPrice }})</button>
                    <button class="btn-cancel" @click="$emit('close')">Đóng</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    show: Boolean,
    data: Object
})
const totalPrice = computed(() => {
    let sum = 0;
    props.data.forEach(item => {
        sum += item.price.value * item.quantity;
    });
    sum += 15000;
    return formatVND(sum);
})
const emit = defineEmits(['confirm', 'close']);
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
        sum += item.price.value * item.quantity;
    });
    return formatVND(sum);
})
const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<style lang="scss" scoped>
.col-btn {
    display: flex;
    justify-content: center;
    padding: 0px 20px 10px 20px;

    .btn-add {
        width: auto;
        height: 40px;
        background-color: #ee4d2d;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
    }

    .btn-cancel {
        width: 100px;
        height: 40px;
        background-color: #fff;
        border: 1px solid #ee4d2d;
        border-radius: 5px;
        color: #ee4d2d;
        font-size: 16px;
        font-weight: bold;
    }

    .btn-add:focus,
    .btn-cancel:focus {
        outline: none;
        border: 1px solid #ee4d2d
    }
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

.c-quantity {
    display: flex;
    margin-top: auto;
    align-items: center;
    justify-content: center;
    padding: 0;
    gap: 10px;
}

.btn-update {
    font-size: 22px;
    cursor: pointer;
    font-weight: 700;
    width: 20px;
    height: 20px;
    display: flex;
    border-radius: 5px;
    margin-left: auto;
    margin-right: 10px;
    margin-top: auto;
    margin-bottom: auto;
    align-items: center;
    justify-content: center;
    background-color: #ee4d2d;
    color: #fff;
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
}


.modal-container {
    width: 600px;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    padding: 10px;

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

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>