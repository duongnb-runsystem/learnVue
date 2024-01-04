<!-- <script setup>
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router';
import ButtonCustom from '@/components/ButtonCustom.vue'
import router from '@/router';
const route = useRoute();
const message = ref(route.params.message)
const point = ref((100 - route.params.point).toFixed())
const number = ref(0)
const tweened = reactive({
    number: point
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
</script>
<template>
    <h1>{{ message }}</h1>
    <h1 v-if="point != 0">{{ tweened.number.toFixed(0) }}</h1>
    <div class="div-button-level">
        <ButtonCustom style="height: 70px;" label="Start Again" @click="startAgain()" />
    </div>
</template> -->



<script setup>
import { ref, reactive, watch, onBeforeMount } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router';
import ButtonCustom from '@/components/ButtonCustom.vue'
import router from '@/router';
const route = useRoute();
const message = ref(route.params.message)

const number = ref()
const tweened = reactive({
    number: 0
})
onBeforeMount(() => {
    setTimeout(() => {
        number.value = (100 - route.params.point).toFixed()
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
</script>

<template>
    <h1>{{ message }}</h1>
    <h1>{{ tweened.number.toFixed(0) }}</h1>
    <div class="div-button-level">
        <ButtonCustom style="height: 70px;" label="Start Again" @click="startAgain()" />
    </div>
</template>

<style>
.big-number {
    font-weight: bold;
    font-size: 2em;
}
</style>
