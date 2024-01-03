<script setup>
const props = defineProps({
    textColor: String,
    label: String,
    rank: String,
    backgroundColor: String,
})
</script>
<template>
    <div class="button-select-level" :style="{ backgroundColor: backgroundColor, }">
        <span class="span-title" :style="{ color: textColor }">{{ label }}</span>
        <span class="span-rank" :style="{ color: textColor }">{{ rank }}</span>
    </div>
</template>