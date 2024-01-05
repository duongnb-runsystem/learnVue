<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted, onUnmounted } from 'vue'
import TableRank from '@/components/TableRank.vue'
import ButtonCustom from '@/components/ButtonCustom.vue'
import { useRoute } from 'vue-router';
import router from '@/router';
const rankPoint4 = ref([]);
const rankPoint6 = ref([]);
const rankPoint8 = ref([]);
const rankPoint10 = ref([]);

onMounted(() => {
    // Get data from storage
    rankPoint4.value = JSON.parse(localStorage.getItem('rankPoints4'));
    rankPoint6.value = JSON.parse(localStorage.getItem('rankPoints6'));
    rankPoint8.value = JSON.parse(localStorage.getItem('rankPoints8'));
    rankPoint10.value = JSON.parse(localStorage.getItem('rankPoints10'));

    // Sort data
    rankPoint4.value.sort((a, b) => b - a)
    rankPoint6.value.sort((a, b) => b - a)
    rankPoint8.value.sort((a, b) => b - a)
    rankPoint10.value.sort((a, b) => b - a)

    // Remove data > 10
    rankPoint4.value.splice(10);
    rankPoint6.value.splice(10);
    rankPoint8.value.splice(10);
    rankPoint10.value.splice(10);
})
const goBack = () => {
    router.replace({ path: '/' });
}
</script>
<template>
    <div class="div-container-center">
        <h1>Ranking</h1>
        <div class="div-grid-rank">
            <TableRank rank="4x4" :dataRank="rankPoint4" />
            <TableRank rank="6x6" :dataRank="rankPoint6" />
            <TableRank rank="8x8" :dataRank="rankPoint8" />
            <TableRank rank="10x10" :dataRank="rankPoint10" />
        </div>
        <ButtonCustom style="height: 50px;" label="Back" @click="goBack()" />
    </div>
</template>
<style scoped>
.div-grid-rank {
    grid-template-columns: repeat(4, auto);
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>