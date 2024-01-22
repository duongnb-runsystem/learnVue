<script setup>
const props = defineProps({
    data: Object,
})
const emit = defineEmits(['scrollCategory']);
</script>
<template>
    <div class="left-content">
        <h1>Thực đơn</h1>
        <div class="c-category">
            <div class="i-category" :id="item.id" v-for="item in data" @click="emit('scrollCategory', item)">
                <h3>{{ item.name }}</h3>
            </div>
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
    max-height: 500px;
    width: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #fff;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}

.i-category {
    display: flex;
    padding-left: 10px;
    margin-top: 10px;
    cursor: pointer;

    h3 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0px;
        margin: 0px;
        font-size: 15px;
    }
}

.i-category:hover {
    border-radius: 5px;
    background-color: rgb(217, 217, 217);
}
</style>