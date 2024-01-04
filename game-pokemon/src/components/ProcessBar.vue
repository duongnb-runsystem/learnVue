<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    completed: Number,
    maxWidth: Number,
    colorProcess: String,
})

const fillerStyles = computed(() => {
    return {
        height: "100%",
        width: widthProcess.value,
        backgroundColor: colorProcess.value,
        borderRadius: "inherit",
        textAlign: "right",
    };
});
const widthProcess = computed(() => {
    return `${props.completed}%`;
});
const colorProcess = computed(() => {
    if (props.completed > 90) {
        return "red";
    } else if (props.completed > 50) {
        return "orange";
    } else {
        return "green";
    }
});
</script>
<template>
    <div class="container" :style="{ width: `${props.maxWidth}px` }">
        <div :style="{
            width: `${props.completed}%`,
            backgroundColor: `${colorProcess}`,
            height: '100%',
            borderRadius: 'inherit',
        }"></div>
    </div>
</template>
<style scoped>
.container {
    height: 20px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: #e0e0de;
    border-radius: 50px;
    margin: 50px;
}
</style>