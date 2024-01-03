<script setup>
import { ref } from 'vue'
const props = defineProps({
    Message: String,
})

</script>
<template>
    <h1>{{ Message }}</h1>
    <h1>You lose</h1>
</template>
