<script setup>
const props = defineProps({
    data: Object,
})
const emit = defineEmits(['scrollCategory']);
</script>
<template>
    <div class="c-category" v-for="item in data" @click="emit('scrollCategory', item)">
        <h3>{{ item }}</h3>
    </div>
</template>
<style scoped lang="scss">
.c-category {
    display: flex;

    padding-left: 10px;
    margin-top: 10px;

    h3 {
        height: 100%;
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
    }
}

.c-category:hover {
    border-radius: 5px;
    background-color: rgb(217, 217, 217);
}
</style>