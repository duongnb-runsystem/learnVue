
<script setup>
import { ref } from 'vue'
import router from '@/router';
import ButtonCustom from '@/components/ButtonCustom.vue'
const buttons = ref([
    { label: '4x4', param: '4', rank: 'Ez' },
    { label: '6x6', param: '6', rank: 'Normal' },
    { label: '8x8', param: '8', rank: 'Hard' },
    { label: '10x10', param: '10', rank: 'Super Hard' },
]);

const selectLevel = (index) => {
    router.push({ name: 'Game', params: { level: buttons.value[index].param } });
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
