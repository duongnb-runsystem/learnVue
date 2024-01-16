<template>
    <div class="c-container">
        <div class="c-nowSearch">
            <h1 class="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
            <p class="local">có 77201 địa điểm ở TP. HCM từ 00:00 - 23:59</p>
            <div class="c-input-search">
                <input class="f-search" v-model="searchHome" placeholder="Tìm địa điểm, món ăn, địa chỉ...">
                <div class="btn-search" @click="searchClick">
                    <font-awesome-icon class="ic-search" icon="magnifying-glass" />
                </div>
            </div>
            <div class="c-tab-category">
                <div class="tab-category" v-for="item in categorySearch" @click="chooseTabCategory(item)">
                    <span>{{ item.display_text }}</span>
                    <div :class="{ isSelected: item.isSelected }"> </div>
                </div>
            </div>
            <div class="c-tag-search">
                <div class="tag-search" v-for="item in tagSearch" @click="chooseTagSearch(item)">
                    <span>{{ item.display_text }}</span>
                </div>
            </div>
            <div>

            </div>
            <div class="c-footer-search">
                Sử dụng App ShopeeFood để có nhiều giảm giá và trải nghiệm tốt hơn
            </div>
        </div>
        <div class="f-login">
            <h1>Đăng nhập</h1>
            <input class="i-email" v-model="email" placeholder="Tên đăng nhập*" />
            <p class="error" :class="{ inValidateForm: inValidateEmail }">Tên đăng nhập không đúng</p>
            <input class="i-email" type="password" v-model="password" placeholder="Mật khẩu*" />
            <p class="error" :class="{ inValidateForm: inValidatePassword }">Mật khẩu không đúng</p>
            <div class="c-function">
                <div class="c-remember" @click="remember = !remember">
                    <input type="checkbox" id="remember" v-model="remember">
                    <span>Ghi nhớ đăng nhập</span>
                </div>
                <div class="c-forgot" @click="forgotPassword">
                    <span>Quên mật khẩu</span>
                </div>
            </div>

            <div class="btn-login" @click="loginClick">
                Đăng nhập
            </div>
            <hr />
            <div class="btn-login-google" @click="loginGoogle">
                <img src="@/assets/images/icon-google.svg" />
                Đăng nhập với Google
            </div>
            <div class="btn-login-google" @click="loginApple">
                Đăng nhập với Apple
            </div>
            <div class="c-footer-login">
                <span>Bạn chưa có tài khoản?</span>
                <p @click="registerClick">Đăng ký</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import router from '@/router/index';
import service from '@/services/axios.service'
import { useIsLoginStore } from '@/stores/login.js'
const email = ref('');
const password = ref('');
const inValidateEmail = ref(false);
const inValidatePassword = ref(false);
const remember = ref(false);
const tagSearch = computed(() => {
    let arr = [];
    categorySearch.value.forEach(item => {
        if (item.isSelected === true) {
            arr = item.children;
        }
    });
    return arr;
})
const searchHome = ref('');
const categorySearch = ref([]);

const forgotPassword = () => {
    alert('comming soon');
}
const loginGoogle = () => {
    alert('comming soon');
}
const loginApple = () => {
    alert('comming soon');
}
const searchClick = () => {
    alert('comming soon');
}
const registerClick = () => {
    router?.push('/register');
}
const chooseTabCategory = (item) => {
    categorySearch.value.forEach(item => {
        item.isSelected = false;
    });
    item.isSelected = !item.isSelected;
}
const chooseTagSearch = (item) => {
    alert('comming soon');
}
const loginClick = () => {

    inValidateEmail.value = inValidatePassword.value = false;

    if (email.value.length > 0 && password.value.length > 0) {
        if (remember.value)
            localStorage.setItem('isRememberLogin', JSON.stringify(true));
        routerToHome();
    } else {
        inValidateEmail.value = email?.value.length == 0;
        inValidatePassword.value = password?.value.length == 0;
    }
}
const getData = async () => {
    let data = await service.get('/api/landing_page/get_web_footers_by_city_id?city_id=217');
    console.log(data);
    categorySearch.value = data.data.reply.web_footer.filter(item => item.link !== 'https://shopeefood.vn');
    //add property selected to categorySearch
    categorySearch.value.forEach(item => {
        item.isSelected = false;
    });
    categorySearch.value[0].isSelected = true;
    console.log(categorySearch);
}

onBeforeMount(() => {
    console.log('mounted login');
    getData();
    let isRememberLogin = JSON.parse(localStorage.getItem('isRememberLogin'));
    if (isRememberLogin) {
        routerToHome();
    }
});
const routerToHome = () => {
    useIsLoginStore().setIsLogin(true);
    router?.push('/home');
}
getData();

</script>

<style lang="scss">
@import './styles.scss';
</style>