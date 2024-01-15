<template>
    <div class="c-container">
        <div class="c-nowSearch">
            <h1 class="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
            <p class="local">có 77201 địa điểm ở TP. HCM từ 00:00 - 23:59</p>
            <div class="c-input-search">
                <input class="f-search" v-model="searchHome" placeholder="Tìm địa điểm, món ăn, địa chỉ...">
                <div class="btn-search">
                    <font-awesome-icon class="ic-search" icon="magnifying-glass" />
                </div>
            </div>
            <div class="c-tag-search">
                <div class="tag-search" v-for="item in tagSearch">
                    <p>{{ item.display_text }}</p>
                </div>
            </div>
        </div>
        <div class="f-login">
            <h1>Đăng nhập</h1>
            <input class="i-email" v-model="email" placeholder="Tên đăng nhập*" />
            <p class="error" :class="{ inValidateForm: inValidateEmail }">Tên đăng nhập không đúng</p>
            <input class="i-email" type="password" v-model="password" placeholder="Mật khẩu*" />
            <p class="error" :class="{ inValidateForm: inValidatePassword }">Mật khẩu không đúng</p>
            <div class="c-function">
                <div class="c-remember">
                    <input type="checkbox" id="remember" name="remember" value="remember">
                    <span>Ghi nhớ đăng nhập</span>
                </div>
                <div class="c-forgot">
                    <span>Quên mật khẩu</span>
                </div>
            </div>

            <div class="btn-login" @click="loginClick">
                Đăng nhập
            </div>
            <hr />
            <div class="btn-login-google" @click="emit('loginGoogle')">
                <img src="@/assets/images/icon-google.svg" />
                Đăng nhập với Google
            </div>
            <div class="btn-login-google" @click="emit('loginGoogle')">
                Đăng nhập với Apple
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import router from '@/router/index';
import service from '@/services/axios.service'
const email = ref();
const password = ref();
const inValidateEmail = ref(false);
const inValidatePassword = ref(false);
const tagSearch = ref([]);;
const loginClick = () => {

    router?.replace({ name: 'home' });
    return;
    if (email.value === 'admin' && password.value === 'admin') {
        // useCounterStore().setIsLogin(true);
        router?.replace({ name: 'home' });
    } else {
        if (email.value !== 'admin') {
            inValidateEmail.value = true;
        }
        if (password.value !== 'admin') {
            inValidatePassword.value = true;
        }
    }
}
const getData = async () => {
    let data = await service.get('/api/landing_page/get_web_footers_by_city_id?city_id=217');
    tagSearch.value = data.data.reply.web_footer[3].children;
}
getData();
</script>

<style lang="scss">
@import './styles.scss';
</style>