<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import ButtonCustom from './ButtonCustom.vue';
import router from '../router';
const route = useRoute();
const Message = ref(route.params.message)
const Point = ref((100 - route.params.point).toFixed())

let textColorButton = ref("#EE9d9d")
let backgroundColorButton = ref("transparent")
function hoverButton(index) {
    buttons.value[index].backgroundColor = '#EE9d9d';
    buttons.value[index].textColor = 'white';
}
function leaveButton(index) {
    buttons.value[index].backgroundColor = 'transparent';
    buttons.value[index].textColor = '#EE9d9d';
}
const buttons = ref([
    { label: 'Start Again', backgroundColor: 'transparent', textColor: '#EE9d9d' },]);
function startAgain() {
    router.replace({ path: '/' });
}
</script>
<template>
    <h1>{{ Message }}</h1>
    <h1 v-if="Point != 0">Point : {{ Point }}</h1>
    <div class="div-button-level">
        <ButtonCustom style="height: 70px;" v-for="(button, index) in  buttons " :text-color="button.textColor"
            :label="button.label" :rank="button.rank" :background-color="button.backgroundColor"
            @mouseover="hoverButton(index)" @mouseleave="leaveButton(index)" @click="startAgain()" />
    </div>
</template>
