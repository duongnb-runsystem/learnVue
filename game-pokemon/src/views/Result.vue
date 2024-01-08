<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router';
import ButtonCustom from '@/components/ButtonCustom.vue'
import router from '@/router';
import congratulationAnimation from '@/assets/congratulationAnimation.json'

const route = useRoute();
const message = ref()
const animation = ref()
const point = ref()
const watchPoint = reactive({
    number: 0
})
const intervalCountDown = ref()
const countDownTime = ref(10);

onBeforeMount(() => {
    message.value = localStorage.getItem('message');
    point.value = localStorage.getItem('point');
    animation.value = congratulationAnimation

    intervalCountDown.value = setInterval(() => {
        countDownTime.value--;
        if (countDownTime.value === 0) {
            startAgain();
        }
    }, 1000)
})
onUnmounted(() => {
    clearInterval(intervalCountDown.value)
})
watch(
    point,
    (n) => {
        gsap.to(watchPoint, { duration: 0.5, number: Number(n) || 0 })
    },
)
const startAgain = () => {
    router.replace({ path: '/' });
}
onMounted(() => {
    if (message.value === "You win")
        playSound("audioWin");
    else
        playSound("audioLose");
})
const playSound = (id) => {
    var playSoundStorage = localStorage.getItem('playSound');
    if (playSoundStorage === "false")
        return;
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
    <div class="parent-container">
        <div class="c-message-point">
            <h1>{{ message }}</h1>
            <h1>{{ watchPoint.number.toFixed(0) }}</h1>
        </div>
        <Vue3Lottie v-if="message === 'You win'" :height="500" :animationData="animation" :width="700" :loop="true"
            :speed="1" :autoPlay="true" />
    </div>
    <div class="c-center">
        <p>Go To Home Screen After : {{ countDownTime }}</p>
        <ButtonCustom class="btn-goBack" label="Go Home" @click="startAgain()" />
    </div>
</template>

<style scoped>
.btn-goBack {
    height: 50px;
}

.parent-container {
    position: relative;
    width: 100vw;
    height: 500px;
}

.c-message-point {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.c-message-point h1 {
    margin: 0;
    font-size: 7rem;
}

.vue3-lottie-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
</style>