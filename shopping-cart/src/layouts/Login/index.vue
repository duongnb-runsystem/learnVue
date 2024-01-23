<template>
    <div class="c-container">
        <div class="c-nowSearch">
            <h1 class="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
            <p class="local">có 77201 địa điểm ở TP. HCM từ 00:00 - 23:59</p>
            <div class="c-tab-category">
                <div class="tab-category" v-for="item in categorySearch" :id="item.id" @click="chooseTabCategory(item)">
                    <span :class="{ isSelected: item.isSelected }">{{ item.display_text }}</span>
                    <div :class="{ isSelected: item.isSelected }"> </div>
                </div>
            </div>
            <div class="c-tag-search">
                <div class="tag-search" v-for="item in tagSearch" :id="item.id" @click="chooseTagSearch(item)">
                    <span>{{ item.display_text }}</span>
                </div>
            </div>

            <div class="c-footer-search">
                Sử dụng App ShopeeFood để có nhiều giảm giá và trải nghiệm tốt hơn
            </div>
        </div>
        <div class="f-login">
            <h1>Đăng nhập</h1>

            <UiInputValidation :text="email" @update="updateEmail" :inValidate="inValidateEmail"
                :messageValidate="messageValidateEmail" placeholder="Tên đăng nhập*" />
            <UiInputValidation @update="updatePassword" type="password" :inValidate="inValidatePassword"
                :messageValidate="messageValidatePassword" placeholder="Mật khẩu*" />
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
            <div class="btn-login-google" @click="loginFacebook">
                <img src="@/assets/images/icon-facebook.svg" />
                Đăng nhập với Facebook
            </div>
            <div class="c-footer-login">
                <span>Bạn chưa có tài khoản?</span>
                <p @click="registerClick">Đăng ký</p>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <ModalError :show="showErorr" :data="msgError" @close="showErorr = false"></ModalError>
    </Teleport>
</template>

<script setup>
import ModalError from '@/components/baseForm/ModalError.vue';
import { computed, onMounted, ref } from 'vue';
import router from '@/router/index';
import service from '@/services/axios.service.js'
import { useAuthStore } from '@/stores/auth.js'
import UiInputValidation from '@/components/baseForm/UiInputValidation.vue';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import fireBaseApp from '@/firebase.js';
import { isValidEmail } from '@/core/utils/regexValidate.js'
import { processErrorFirebase } from '@/core/utils/common.js'
import { API_ALL_CATEGORY } from '@/core/constants/app.js'

const msgError = ref('');
const showErorr = ref(false);
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const inValidateEmail = ref(false);
const inValidatePassword = ref(false);
const remember = ref(false);
const messageValidatePassword = ref('Không được bỏ trống');
const messageValidateEmail = ref('Không được bỏ trống');

const tagSearch = computed(() => {
    let arr = [];
    categorySearch.value.forEach(item => {
        if (item.isSelected === true) {
            arr = item.children;
        }
    });
    return arr;
})
const updateEmail = (value) => {
    email.value = value;
}
const updatePassword = (value) => {
    password.value = value;
}
const searchShop = ref('');
const categorySearch = ref([]);

const forgotPassword = () => {
    alert('comming soon');
}
const loginGoogle = () => {

    const ggProvider = new GoogleAuthProvider();
    const auth = getAuth(fireBaseApp);
    signInWithPopup(auth, ggProvider).then((result) => {

        routerToHome();

    }).catch((error) => {
        // Handle Errors here.
    })
}
const loginFacebook = () => {
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
const loginClick = async () => {
    inValidateEmail.value = inValidatePassword.value = false;
    if (email.value.length > 0 && password.value.length > 0) {
        if (remember.value)
            localStorage.setItem('isRememberLogin', JSON.stringify(true));
        const auth = getAuth(fireBaseApp);
        await signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('userId', user.uid);
            routerToHome();
        })
            .catch((error) => {
                msgError.value = processErrorFirebase(error.code);
                showErorr.value = true;
            })
    }
    else {
        if (email?.value?.length === 0) {
            inValidateEmail.value = true;
            messageValidateEmail.value = "Không được bỏ trống";
            return;
        }
        if (!isValidEmail(email.value)) {
            inValidateEmail.value = true;
            messageValidateEmail.value = "Email không hợp lệ";
            return;
        }
        if (password?.value?.length === 0) {
            inValidatePassword.value = true;
            messageValidatePassword.value = "Không được bỏ trống";
            return;
        }
    }
}

const getData = async () => {
    let data = await service.get(API_ALL_CATEGORY);
    categorySearch.value = data.data.reply.web_footer.filter(item => item.link !== 'https://shopeefood.vn');
    categorySearch.value.forEach(item => {
        item.isSelected = false;
    });
    categorySearch.value[2].isSelected = true;
}
onMounted(() => {
    let emailRegister = authStore.getEmailRegister;
    if (emailRegister) {
        email.value = emailRegister;
    }
    getData();
    let isRememberLogin = JSON.parse(localStorage.getItem('isRememberLogin'));
    if (isRememberLogin) {
        const auth = getAuth(fireBaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                if (uid !== null) {
                    routerToHome();
                }
            }
            else {
                localStorage.setItem('isRememberLogin', JSON.stringify(false));
            }
        });

    }
});
const routerToHome = () => {
    router?.push('/home');
}
getData();

</script>

<style lang="scss">
@import './styles.scss';
</style>