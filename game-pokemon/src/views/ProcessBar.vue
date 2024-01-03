<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    bgcolor: String,
    completed: Number,
    maxwidth: Number,
})

const fillerStyles = computed(() => {
    return {
        height: "100%",
        width: `${props.completed}%`,
        backgroundColor: props.bgcolor,
        borderRadius: "inherit",
        textAlign: "right",
    };
});
</script>
<template>
    <div class="container" :style="{ width: `${props.maxwidth}px` }">
        <div :style="fillerStyles">
        </div>
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