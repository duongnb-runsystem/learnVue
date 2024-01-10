<script setup>
import { defineProps } from 'vue'
const prop = defineProps({
    item: Object,
    show: Boolean,

})
</script>
<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <img :src="item.photos[3].value" />
                <div class="c-content">
                    <div class="c-info">
                        <h1>{{ item.name }}</h1>
                        <p>{{ item.description }}</p>
                    </div>
                    <div class="c-price">
                        <h3 class="lb-price" :class="{ isDiscount: item?.discount_price?.text }">{{ item.price.text }}</h3>
                        <h3 class="lb-price">{{ item?.discount_price?.text }}</h3>
                    </div>
                </div>

                <div class="col-btn">
                    <button class="btn-add" @click="$emit('addCart', item)">+ Add</button>
                    <button class="btn-cancel" @click="$emit('close')">Cancel</button>
                </div>
            </div>
        </div>
    </Transition>
</template>
<style scoped>
/* */
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

.modal-container {
    width: 600px;
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    img {
        width: 100%;
    }

    .c-content {
        display: flex;
        padding-left: 10px;

        .c-infor {
            display: flex;
            margin-left: 10px;
        }

        .c-price {
            margin-top: auto;
            margin-bottom: auto;
            position: relative;
            text-align: right;
            justify-content: center;
            align-items: center;
            padding-right: 10px;

            .lb-price {
                font-size: 20px;
                font-weight: bold;
                margin-top: 0;
                margin-bottom: 0;
                color: #ee4d2d;
            }

            .isDiscount {
                color: #888888;
                font-size: 15px;
                text-decoration: line-through;
            }
        }
    }

    .col-btn {
        display: flex;
        justify-content: center;
        padding: 0px 20px 10px 20px;

        .btn-add {
            width: 100px;
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
}

.isDiscount {
    color: #888888;
    font-size: 15px;
    text-decoration: line-through;
}

.modal-header h3 {
    margin-top: 0;
    color: #ee4d2d;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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