<template>
    <div class="c-container">
        <div class="f-regis">
            <h1>Đăng ký</h1>
            <div class="c-name-avatar">
                <div class="i-name">
                    <UiInputValidation @update="updateName" :inValidate="inValidateName"
                        :messageValidate="messageValidateName" placeholder="Họ và tên*" />
                </div>
                <div class="c-avatar">
                    <label for="i-avatar-input" class="custom-file-upload">
                        Choose File
                    </label>
                    <input id="i-avatar-input" type="file" @change="onFileChange" accept="image/*">
                    <img class="i-avatar" :src="imageUrl" v-if="imageUrl">
                </div>
            </div>
            <UiInputValidation @update="updateEmail" :inValidate="inValidateEmail" :messageValidate="messageValidateEmail"
                placeholder="Email*" />
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
    <Teleport to="body">
        <ModalError :show="showErorr" :data="msgError" @close="showErorr = false"></ModalError>
    </Teleport>
</template>

<script setup>

import { ref } from 'vue';
import router from '@/router/index';
import UiInputValidation from '@/components/baseForm/UiInputValidation.vue';
import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fireBaseApp from '@/firebase.js';
import { useAuthStore } from '@/stores/auth';
import { isValidEmail } from '@/core/utils/regexValidate.js';
import { processErrorFirebase } from '@/core/utils/common.js';
import ModalError from '@/components/baseForm/ModalError.vue';
import { update } from 'firebase/database';
import { useCommonStore } from '@/stores/_common.js';

const authStore = useAuthStore();
const inValidateEmail = ref(false);
const inValidatePassword = ref(false);
const inValidateRePassword = ref(false);
const inValidateName = ref(false);

const messageValidateName = ref('Không được bỏ trống');
const messageValidateEmail = ref('Không được bỏ trống');
const messageValidatePassword = ref('Không được bỏ trống');
const messageValidateRePassword = ref('Không được bỏ trống');

const name = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');

const msgError = ref('');
const showErorr = ref(false);

const imageUrl = ref('');
const file = ref(null);
const onFileChange = (e) => {
    file.value = e.target.files[0];
    if (file?.value)
        imageUrl.value = URL.createObjectURL(file.value);
    else
        imageUrl.value = '';
};

const updateEmail = (value) => {
    email.value = value;
}
const updateName = (value) => {
    name.value = value;
}
const updatePassword = (value) => {
    password.value = value;
}
const updateRePassword = (value) => {
    rePassword.value = value;
}
const registerClick = async () => {

    inValidateEmail.value = false;
    inValidatePassword.value = false;
    inValidateRePassword.value = false;
    inValidateName.value = false;
    if (name?.value?.length > 0 && email?.value?.length > 0 && password?.value?.length > 0 && rePassword?.value?.length > 0) {
        if (!isValidEmail(email.value)) {
            inValidateEmail.value = true;
            messageValidateEmail.value = "Email không hợp lệ";
            return;
        }
        if (password.value.length < 6) {
            inValidatePassword.value = true;
            messageValidatePassword.value = "Mật khẩu phải có ít nhất 6 ký tự";
            return;
        }
        if (password.value !== rePassword.value) {
            inValidateRePassword.value = true;
            messageValidateRePassword.value = "Mật khẩu không khớp";
            return;
        }
        const auth = getAuth(fireBaseApp);
        await createUserWithEmailAndPassword(auth, email.value, password.value).then(async (userCredential) => {
            useCommonStore().setLoading(true);
            const user = userCredential.user;

            // Create a storage reference
            const storage = getStorage();
            const fileRef = storageRef(storage, user.uid);
            const uploadTask = uploadBytesResumable(fileRef, file.value);

            await uploadTask.then(() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfile(user, { photoURL: downloadURL, displayName: name.value });
                });
            });

            authStore.setEmailRegister(email.value);
            signOut(auth);
            useCommonStore().setLoading(false);
            router.push('/');
        })
            .catch((error) => {
                msgError.value = processErrorFirebase(error.code);
                showErorr.value = true;
                useCommonStore().setLoading(false);
            })
    }
    else {
        if (name?.value?.length === 0) {
            inValidateName.value = true;
            messageValidateName.value = "Không được bỏ trống";
        }
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