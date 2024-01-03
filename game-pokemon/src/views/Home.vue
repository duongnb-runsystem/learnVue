
<script setup>
import { ref } from 'vue'
import router from '../router';
import ButtonCustom from './ButtonCustom.vue'
const buttons = ref([
    { label: '4x4', col: '4', rank: 'Ez', backgroundColor: 'transparent', textColor: '#EE9d9d' },
    { label: '6x6', col: '6', rank: 'Normal', backgroundColor: 'transparent', textColor: '#EE9d9d' },
    { label: '8x8', col: '8', rank: 'Hard', backgroundColor: 'transparent', textColor: '#EE9d9d' },
    { label: '10x10', col: '10', rank: 'Super Hard', backgroundColor: 'transparent', textColor: '#EE9d9d' },
]);
function hoverButton(index) {
    buttons.value[index].backgroundColor = '#EE9d9d';
    buttons.value[index].textColor = 'white';
}
function leaveButton(index) {
    buttons.value[index].backgroundColor = 'transparent';
    buttons.value[index].textColor = '#EE9d9d';
}
async function selectLevel(index) {
    console.log(index);
    router.push({ name: 'Game', params: { level: this.buttons[index].col } });
}
</script>
<template>
    <div class="root">
        <div class="div-container-center">
            <h1>Poke Memories</h1>
            <p>Select mode to start game</p>
            <div class="div-button-level">
                <ButtonCustom v-for="(button, index) in  buttons " :text-color="button.textColor" :label="button.label"
                    :rank="button.rank" :background-color="button.backgroundColor" @mouseover="hoverButton(index)"
                    @mouseleave="leaveButton(index)" @click="selectLevel(index)" />
            </div>
        </div>
    </div>
</template>
