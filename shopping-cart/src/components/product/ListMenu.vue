<script setup>
const props = defineProps({
    data: Object,
})
const emit = defineEmits(['scrollCategory']);
</script>
<template>
    <div class="left-content">
        <h1>Thực đơn</h1>
        <div class="c-category" :id="item.id" v-for="item in data" @click="emit('scrollCategory', item)">
            <h3>{{ item.name }}</h3>
        </div>
    </div>
</template>
<style scoped lang="scss">
.left-content {
    position: sticky;
    top: 0;
    width: 250px;
    margin-left: 230px;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px 20px;
    align-items: right;
    justify-content: right;
    text-align: left;
}

.c-category {
    display: flex;
    padding-left: 10px;
    margin-top: 10px;

    h3 {
        height: 100%;
        font-size: 15px;
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        justify-content: left;
        text-align: left;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.c-category:hover {
    border-radius: 5px;
    background-color: rgb(217, 217, 217);
}
</style>