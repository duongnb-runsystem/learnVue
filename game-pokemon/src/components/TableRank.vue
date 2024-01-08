<script setup>
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
    rank: String,
})
const dataRank = ref([]);
onMounted(() => {
    dataRank.value = getDataRank();
})
const labelRank = computed(() => {
    (props.rank)
    switch (props.rank) {
        case '4':
            return '4x4';
        case '6':
            return '6x6';
        case '8':
            return '8x8';
        case '10':
            return '10x10';
        default:
            return '4x4';
    }
})
const getDataRank = () => {
    var key = 'rankPoints' + props.rank;
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}
</script>
<template>
    <div class="div-container-center">
        <h1>{{ labelRank }}</h1>
        <div class="t-rank">
            <table>
                <tbody>
                    <tr v-for="item in dataRank" :key="item">
                        <p> {{ item }}</p>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
.t-rank {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #EE9d9d;
    width: 300px;
    height: 400px;
    border-radius: 10px;
    background-color: transparent;
    margin-left: 10px;
    margin-right: 10px;
    overflow-y: auto;
    scrollbar-color: #EE9d9d;
}

div::-webkit-scrollbar {
    width: 10px;
    /* Set the width of the scrollbar */
}

div::-webkit-scrollbar-thumb {
    background-color: #EE9d9d;
    border-radius: 20px;
    /* Set the color of the scrollbar handle */
}

div::-webkit-scrollbar-thumb:hover {
    background-color: #ffd3d3;
    /* Set the color when hovering over the handle */
}

div::-webkit-scrollbar-track {
    background-color: transparent;
    /* Set the color of the scrollbar track */
}
</style>