
<script setup>
import { ref } from 'vue'
import router from '@/router';
import ButtonCustom from '@/components/ButtonCustom.vue'
const buttons = ref([
    { label: '4x4', col: '4', rank: 'Ez' },
    { label: '6x6', col: '6', rank: 'Normal' },
    { label: '8x8', col: '8', rank: 'Hard' },
    { label: '10x10', col: '10', rank: 'Super Hard' },
]);

const selectLevel = (index) => {
    router.push({ name: 'Game', params: { level: buttons.value[index].col } });
}
</script>
<template>
    <div class="div-container-center">
        <h1>Poke Memories</h1>
        <p>Select mode to start game</p>
        <div class="div-button-level">
            <ButtonCustom v-for="(button, index) in  buttons " :label="button.label" :rank="button.rank"
                @click="selectLevel(index)" />
        </div>
    </div>
</template>
<style scoped>
.div-button-level {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.div-container-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
}
</style>
