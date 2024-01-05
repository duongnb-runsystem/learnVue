<script setup>
const props = defineProps({
    rank: String,
    dataRank: Object,
})

</script>
<template>
    <div class="div-container-center">
        <h1>{{ rank }}</h1>
        <div class="div-table-rank">
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
.div-table-rank {
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