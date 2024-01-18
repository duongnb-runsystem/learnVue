<script setup>
import common from '@/core/utils/common.js';

import { ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import fireBaseApp from '@/firebase.js';
import router from '../../router';
import { formatVND } from '@/core/utils/common';
/**
 * Layout: use for pages're logged
 */
const address = ref(null);
const kind = ref(null);
const name = ref(null);
const rattingCount = ref(null);
const rattingStart = ref(null);
const minOrder = ref(null);
const maxOrder = ref(null);
const urlImgThumb = ref(null);
const isCallApi = ref(false);
const phone = ref(null);
const nameUser = ref(null);
onMounted(() => {
  getData();
});

const getData = async () => {
  let data = common.dataDetailShop;
  //get detail shop for header

  address.value = data.address;
  name.value = data.name;
  kind.value = data.categories[0];
  rattingCount.value = data.rating.display_total_review;
  minOrder.value = formatVND(data.price_range.min_price);
  maxOrder.value = formatVND(data.price_range.max_price);
  rattingStart.value = parseInt(data.rating.avg.toFixed());
  urlImgThumb.value = data.photos[9].value;
  phone.value = data.phones[0];
  isCallApi.value = true;
  //get data user
  const auth = getAuth(fireBaseApp);
  const user = auth.currentUser;
  if (user) {
    nameUser.value = user.email;
  } else {
    // No user is signed in.
  }
}
const logout = async () => {
  localStorage.setItem('isRememberLogin', JSON.stringify(false));
  const auth = getAuth(fireBaseApp);
  await signOut(auth).then(() => {
    // Sign-out successful.
    router.push('/');
  }).catch((error) => {
    // An error happened.
  });
}
</script>

<template>
  <div class="base-layout">
    <header>
      <div class="c-header-nav">
        <img class="i-shopee"
          src="https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7" />
        <div class="c-user">
          <span class="lb-name">{{ nameUser }}</span>
          <span class="btn-logout" @click="logout">Đăng xuất</span>
        </div>

      </div>
      <div class="c-hearder-banner" v-if="isCallApi">
        <img class="img-banner" :src="urlImgThumb" />
        <div class="c-hearder-infor">
          <p class="kind-restaurant">{{ kind }}</p>
          <h1 class="name-restautant">{{ name }}</h1>
          <p class="add-restautant">{{ address }}</p>
          <p class="add-restautant">SĐT: {{ phone }}</p>
          <div class="rating">
            <font-awesome-icon v-for="item in rattingStart" :id="item" class="start" :icon="['fas', 'star']" />
            <span class="countRate"> {{ rattingCount }}</span>
            đánh giá trên ShopeeFood
          </div>
          <a href="https://foody.vn/ho-chi-minh/highlands-coffee-bach-dang" rel="noopener noreferrer nofollow"
            target="_blank" class="number-review">Xem thêm lượt đánh giá từ Foody</a>
          <p><span class="sttOpen">● Mở cửa</span> - <span class="timeOpen">🕖 07:00 ~ 22:00</span></p>
          <div class="const-restaurant">
            <font-awesome-icon :icon="['fas', 'money-bill-wave']" />
            <span> {{ minOrder }} ~ {{ maxOrder }}</span>
          </div>
        </div>
      </div>

    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
