<script setup>

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import fireBaseApp from '@/firebase.js';
import router from '@/router/index';
import service from '@/services/axios.service';
import { ref, onMounted } from 'vue';
/**
 * Layout: use for pages're logged
 */
const nameUser = ref(null);
const avatarUser = ref(null);
const categorySearch = ref([]);


onMounted(() => {
  getCategoryShop();
  getDataUser();
});
const getDataUser = () => {
  //get data user
  const auth = getAuth(fireBaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nameUser.value = user.displayName;
      avatarUser.value = user.photoURL;
    } else {
    }
  });
}
const getCategoryShop = async () => {
  let data = await service.get('/api/landing_page/get_web_footers_by_city_id?city_id=217');
  categorySearch.value = data.data.reply.web_footer.filter(item => item.link !== 'https://shopeefood.vn');
  //add property selected to categorySearch
  categorySearch.value.forEach(item => {
    item.isSelected = false;
  });
  categorySearch.value[2].isSelected = true;

}
const chooseTabCategory = (item) => {

  if (item.display_text !== "Đồ ăn") {
    alert("Comming soon");
    return;
  }
  categorySearch.value.forEach(item => {
    item.isSelected = false;
  });
  item.isSelected = !item.isSelected;
}
const logout = async () => {
  console.log('logout')
  localStorage.setItem('isRememberLogin', JSON.stringify(false));
  localStorage.setItem('searchRestaurant', null);
  localStorage.removeItem('searchRestaurant');
  localStorage.removeItem('userId');
  const auth = getAuth(fireBaseApp);
  await signOut(auth).then(() => {
    // Sign-out successful.
    router.push('/');
  }).catch((error) => {
    // An error happened.
  });
}
const gotoHome = () => {
  router.push('/home');
}

</script>

<template>
  <div class="base-layout">
    <header>
      <div class="c-header-nav">
        <img class="i-shopee" @click="gotoHome"
          src="https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7" />
        <div class="c-tab-category">
          <div class="tab-category" v-for="item in categorySearch" :id="item.id" @click="chooseTabCategory(item)">
            <span :class="{ isSelectedlb: item.isSelected }">{{ item.display_text }}</span>
            <div :class="{ isSelected: item.isSelected }"> </div>
          </div>

        </div>
        <div class="c-user">
          <img :src="avatarUser" v-if="avatarUser" />
          <span class="lb-name">{{ nameUser }}</span>
          <span class="btn-logout" @click="logout">Đăng xuất</span>
        </div>
      </div>
    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
    <div class="c-footer">

    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
