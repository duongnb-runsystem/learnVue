<template>
    <div class="c-container">
        <div class="f-regis">
            <h1>Đăng ký</h1>
            <UiInputValidation @update="updateEmail" :inValidate="inValidateEmail" :messageValidate="messageValidateEmail"
                placeholder="Tên đăng nhập*" />
            <UiInputValidation @update="updatePassword" type="password" :inValidate="inValidatePassword"
                :messageValidate="messageValidatePassword" placeholder="Mật khẩu*" />
            <UiInputValidation @update="updateRePassword" type="password" :inValidate="inValidateRePassword"
                :messageValidate="messageValidateRePassword" placeholder="Nhập lại mật khẩu*" />
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
import { useIsLoginStore } from '@/stores/login.js'
const inValidateEmail = ref(false);
const inValidatePassword = ref(false);
const inValidateRePassword = ref(false);

const messageValidateEmail = ref('Không được bỏ trống');
const messageValidatePassword = ref('Không được bỏ trống');
const messageValidateRePassword = ref('Không được bỏ trống');

const email = ref('');
const password = ref('');
const rePassword = ref('');
const updateEmail = (value) => {
    email.value = value;
}
const updatePassword = (value) => {
    password.value = value;
}
const updateRePassword = (value) => {
    rePassword.value = value;
}
const registerClick = () => {
    console.log("log value " + email.value.length, password.value, rePassword.value)
    inValidateEmail.value = false;
    inValidatePassword.value = false;
    inValidateRePassword.value = false;

    if (email?.value?.length > 0 && password?.value?.length > 0 && rePassword?.value?.length > 0) {
        if (password.value === rePassword.value) {
            useIsLoginStore().setEmailRegister(email.value);
            router.push('/');
        }
        else {
            inValidateRePassword.value = true;
            messageValidateRePassword.value = "Mật khẩu không khớp";
        }
    }
    else {
        if (email?.value?.length === 0) {
            inValidateEmail.value = true;
            messageValidateEmail.value = "Không được bỏ trống";
        }
        if (password?.value?.length === 0) {
            inValidatePassword.value = true;
            messageValidatePassword.value = "Không được bỏ trống";
        }
        if (rePassword?.value?.length === 0) {
            inValidateRePassword.value = true;
            messageValidateRePassword.value = "Không được bỏ trống";
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