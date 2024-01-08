
<script setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router';
import ButtonCustom from '@/components/ButtonCustom.vue'
import ButtonImg from '@/components/ButtonImg.vue'
const playSound = ref();
const srcPlaySound = computed(() => { return playSound.value ? 'img/volumeOn.svg' : 'img/volumeOff.svg'; });
const buttons = ref([
    { label: '4x4', param: '4', rank: 'Ez' },
    { label: '6x6', param: '6', rank: 'Normal' },
    { label: '8x8', param: '8', rank: 'Hard' },
    { label: '10x10', param: '10', rank: 'Super Hard' },
]);
onMounted(() => {
    playSound.value = localStorage.getItem('playSound') == "true";
})
const selectLevel = (index) => {
    localStorage.setItem('level', buttons.value[index].param);
    router.push({ name: 'Game', params: { level: buttons.value[index].param } });
}
const toggleSound = () => {
    playSound.value = !playSound.value;
    localStorage.setItem('playSound', playSound.value);
}
const toggleRank = () => {
    router.push({ name: 'Ranking' });
}
</script>
<template>
    <div class="c-center">
        <h1>Poke Memories</h1>
        <p>Select mode to start game</p>
        <div class="div-button-level">
            <ButtonCustom v-for="(button, index) in  buttons " :label="button.label" :rank="button.rank"
                @click="selectLevel(index)" />
        </div>
        <div class="div-button-level">
            <ButtonImg :img=srcPlaySound @click="toggleSound" />
            <ButtonImg :img="'img/ranking.svg'" @click="toggleRank" />
        </div>
    </div>
</template>
<style scoped></style>
