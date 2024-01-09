<script setup>
import { defineProps } from 'vue'
const prop = defineProps({
    name: String,
    description: String,
    price: String,
    img: String,
    show: Boolean,
    priceDiscount: String
})
</script>
<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <img :src="img" />
                <div class="c-infor">
                    <h1>{{ name }}</h1>
                    <p>{{ description }}</p>
                    <h3>{{ price }}</h3>
                    <h3 v-if="priceDiscount != `-1`">{{ priceDiscount }}</h3>
                </div>
                <div class="col-btn">
                    <button class="btn-add" @click="$emit('close')">+ Add</button>
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

    .c-infor {
        padding: 0px 20px 0px 20px;

        h3 {
            text-align: right;
        }
    }

    .col-btn {
        display: flex;
        justify-content: center;
        padding: 0px 20px 10px 20px;

        .btn-add {
            width: 100px;
            height: 40px;
            background-color: #42b983;
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
            border: 1px solid #42b983;
            border-radius: 5px;
            color: #42b983;
            font-size: 16px;
            font-weight: bold;
        }
    }
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
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