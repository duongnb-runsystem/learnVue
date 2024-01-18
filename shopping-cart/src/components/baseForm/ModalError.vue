<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <h1>Lỗi</h1>
                <h2>{{ data }}</h2>
                <div class="btn-cancel" @click="$emit('close')">Cancel</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    show: Boolean,
    data: String
})
const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
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
    padding: 10px 30px 10px 30px;
    width: 600px;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.btn-cancel {
    cursor: pointer;
    width: 100px;
    height: 40px;
    margin-left: auto;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: #fff;
    border: 1px solid #ee4d2d;
    border-radius: 5px;
    color: #ee4d2d;
    font-size: 16px;
    font-weight: bold;
}
</style>