<script setup>
const props = defineProps({
    img: String,
})
</script>
<template>
    <div class="btn-img">
        <img :src=img />
    </div>
</template>
<style scoped>
.btn-img {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    margin-top: 15px;
    margin-left: 10px;
    border: 2px solid #EE9d9d;
    width: 100px;
    height: 100px;
    cursor: pointer;
    background-color: transparent;
}

.btn-img:hover {
    border: 2px solid #ffffff;
}

.btn-img img {
    width: 100%;
    height: 100%;
}
</style>