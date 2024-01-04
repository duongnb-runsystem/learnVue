<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router';
import ButtonCustom from '@/components/ButtonCustom.vue'
import router from '@/router';
import congratulationAnimation from '@/assets/congratulationAnimation.json'
const route = useRoute();
const message = ref(route.params.message)
const animation = ref()
const number = ref()
const tweened = reactive({
    number: 0
})
onBeforeMount(() => {
    animation.value = congratulationAnimation
    setTimeout(() => {
        number.value = route.params.point
    }, 0)
})
watch(
    number,
    (n) => {
        gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
    }
)
const startAgain = () => {
    router.replace({ path: '/' });
}
onMounted(() => {
    console.log(message.value)
    if (message.value == "You win")
        playSound("audioWin");
    else
        playSound("audioLose");
})
const playSound = (id) => {
    var audio = document.getElementById(id);
    audio?.play();
}
</script>

<template>
    <audio id="audioWin" hidden="true">
        <source src="@/assets/sound/soundWin.mp3" type="audio/mpeg">
    </audio>
    <audio id="audioLose" hidden="true">
        <source src="@/assets/sound/soundLose.mp3" type="audio/mpeg">
    </audio>
    <div class="div-container-center">
        <h1>{{ message }}</h1>
        <h1>{{ tweened.number.toFixed(0) }}</h1>
    </div>
    <div class="div-button-level">
        <ButtonCustom style="height: 70px;" label="Start Again" @click="startAgain()" />
    </div>
</template>