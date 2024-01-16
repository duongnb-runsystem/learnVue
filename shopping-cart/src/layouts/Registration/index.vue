<template>
    <div class="c-container">
        <div class="f-regis">
            <h1>Đăng ký</h1>
            <input class="i-email" v-model="email" placeholder="Tên đăng nhập*" />
            <span class="error" :class="{ inValidateForm: inValidateEmail }">Tên đăng nhập không đúng</span>
            <input class="i-email" type="password" v-model="password" placeholder="Mật khẩu*" />
            <span class="error" :class="{ inValidateForm: inValidatePassword }">Mật khẩu không đúng</span>
            <input class="i-email" type="password" v-model="rePassword" placeholder="Nhập lại mật khẩu*" />
            <span class="error" :class="{ inValidateForm: inValidateRePassword }">Mật khẩu không khớp</span>
            <div class="btn-regis" @click="registerClick">Đăng ký</div>
            <div class="c-footer-regis">
                <p>Bạn đã có tài khoản?</p>
                <font-awesome-icon icon="right-to-bracket" />
                <span @click="loginClick">Đăng nhập</span>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import router from '@/router/index';
import UiInputValidation from '@/components/baseForm/UiInputValidation.vue';
const inValidateEmail = ref(false);
const inValidatePassword = ref(false);
const inValidateRePassword = ref(false);
const email = ref('');
const password = ref('');
const rePassword = ref('');
const registerClick = () => {
    inValidateEmail.value = false;
    inValidatePassword.value = false;
    inValidateRePassword.value = false;

    if (email?.value?.length > 0 && password?.value?.length > 0 && rePassword?.value?.length > 0) {
        if (password.value === rePassword.value) {
            router.push('/');
        }
        else
            inValidateRePassword.value = true;
    }
    else {
        if (email?.value?.length === 0) {
            inValidateEmail.value = true;
        }
        if (password?.value?.length === 0) {
            inValidatePassword.value = true;
        }
        if (rePassword?.value?.length === 0) {
            inValidateRePassword.value = true;
        }

    }
}
const loginClick = () => {
    router.push('/');
}
</script>

<style lang="scss" >
@import './styles.scss';
</style>