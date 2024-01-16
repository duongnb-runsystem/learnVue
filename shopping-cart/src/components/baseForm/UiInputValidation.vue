<template>
    <div class="password-wrapper">
        <input class="i-email" :class="{ inputerror: props.inValidate }" v-model="localText" @input="updateData"
            :type="localType" :placeholder=props.placeholder />
        <font-awesome-icon v-if="type === 'password'" @click="tooglePassword" class="password-icon" :icon="iconeye" />
    </div>
    <span class="error" :class="{ inValidateForm: props.inValidate }">{{ messageValidate }}</span>
</template>

<script setup>
import { ref, defineProps, computed, watchEffect } from 'vue';
const props = defineProps({
    inValidate: Boolean,
    messageValidate: String,
    placeholder: String,
    type: String,
    text: String
})

const iconeye = ref('eye');
const emit = defineEmits(['update']);
const localText = ref(props.text);
const localType = ref(props.type);
watchEffect(() => {
    localText.value = props.text;
})
const updateData = () => {
    emit('update', localText.value);
}
const tooglePassword = () => {
    if (iconeye.value === 'eye') {
        iconeye.value = 'eye-slash';
        localType.value = 'text';
    }
    else {
        iconeye.value = 'eye';
        localType.value = 'password';
    }
}
</script>

<style lang="scss" scoped>
.i-email {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding-left: 10px;
    margin-top: 10px;
}

.inputerror {
    border: 1px solid red;

}

.password-wrapper {
    position: relative;
}

.password-icon {
    position: absolute;
    right: 10px;
    top: 45%;
    cursor: pointer;
}

.error {
    visibility: hidden;
}

.inValidateForm {
    visibility: visible;
    color: #ee4d2d;
    text-align: left;
}
</style>