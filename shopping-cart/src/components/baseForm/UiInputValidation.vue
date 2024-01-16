<template>
    <input class="i-email" v-model="email" placeholder="Tên đăng nhập*" />
    <span class="error" :class="{ inValidateForm: inValidateEmail }">Tên đăng nhập không đúng</span>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
const props = defineProps({
    data: Object
})
const emit = defineEmits(['update']);
const updateData = () => {
    emit('update', props.data);
}
onMounted(() => {
    console.log(props);
})
</script>

<style lang="scss" scoped>
.error {
    visibility: hidden;
}

.inValidateForm {
    visibility: visible;
    color: #ee4d2d;
    text-align: left;
}
</style>