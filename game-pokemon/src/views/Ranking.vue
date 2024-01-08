<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted, onUnmounted } from 'vue'
import TableRank from '@/components/TableRank.vue'
import ButtonCustom from '@/components/ButtonCustom.vue'
import { useRoute } from 'vue-router';
import router from '@/router';
const goBack = () => {
    router.replace({ path: '/' });
}
</script>
<template>
    <div class="c-center">
        <h1>Ranking</h1>
        <div class="grid-rank">
            <TableRank rank="4" />
            <TableRank rank="6" />
            <TableRank rank="8" />
            <TableRank rank="10" />
        </div>
        <ButtonCustom class="btnBack" label="Back" @click="goBack()" />
    </div>
</template>
<style scoped>
.grid-rank {
    grid-template-columns: repeat(4, auto);
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btnBack {
    height: 50px;

}
</style>