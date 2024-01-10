<script setup>
import service from '@/services/axios.service.js';

import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import DetailProduct from '@/components/product/DetailProduct.vue';
import ListProduct from '@/components/product/ListProduct.vue';
import ListCart from '@/components/product/ListCart.vue';
import ListMenu from '@/components/product/ListMenu.vue';

const menu = ref(null);
const showDetail = ref(false);
const searchTerm = ref('')
const cart = ref([])
const dataCategory = ref([]);
const listProduct = ref(null);
const itemDetail = ref(null);

const getDeliveryUrl = (url) => {
  var rs = url.replace("https://shopeefood.vn/", "");
  return rs;
}
const getData = async () => {
  // url shop
  var urlShop = "https://shopeefood.vn/ho-chi-minh/highlands-coffee-bach-dang";
  //get id shop
  var deliveryUrl = getDeliveryUrl(urlShop);
  var rsIdShop = await service.get(`api/delivery/get_from_url?url=${deliveryUrl}`);
  var idShop = rsIdShop.data.reply.delivery_id;
  //get menu
  const res = await service.get(`api/dish/get_delivery_dishes?id_type=2&request_id=${idShop}`);
  menu.value = res.data.reply.menu_infos;
  menu.value.forEach(item => {
    dataCategory.value.push(item.dish_type_name);
  });
}
getData();

const showDetailClick = (item) => {
  itemDetail.value = item;
  showDetail.value = true;
}

const addProduct = (item) => {
  showDetail.value = false;
  // Check if the item already exists in the cart
  var existItem = cart.value.find((itemCart) => itemCart.id === item.id);

  if (existItem) {
    // If the item already exists, increase its quantity by 1
    existItem.quantity++;
  } else {
    // If the item does not exist, set its quantity to 1 and add it to the cart
    item.quantity = 1;
    cart.value.push(item);
  }
}
const subProduct = (item) => {
  var existItem = cart.value.find((itemCart) => itemCart.id === item.id);
  if (existItem) {
    existItem.quantity--;
    if (existItem.quantity === 0) {
      cart.value = cart.value.filter((itemCart) => itemCart.id !== item.id);
    }
  }
}

const removeCartClick = (item) => {
  item.quantity = 0;
  cart.value = cart.value.filter((itemCart) => itemCart.id !== item.id);
}
const scrollCategory = (item) => {
  $refs.listProduct.scrollToItem(item);
}
</script>

<template>
  <div class="col-content">
    <div class="col-left">
      <div class="left-content">
        <h1>Menu</h1>
        <ListMenu :data="dataCategory" @scrollCategory="scrollCategory"></ListMenu>
      </div>
    </div>
    <div class="center-content">
      <input class="f-search" v-model="searchTerm" placeholder="Search...">
      <ListProduct ref="listProduct" :menu="menu" :querry="searchTerm" @showDetailEmit="showDetailClick"
        @addCart="addProduct" @subCart="subProduct">
      </ListProduct>
    </div>
    <div class="col-right">
      <div class="right-content">
        <ListCart :data="cart" @removeCart="removeCartClick"></ListCart>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <DetailProduct :item="itemDetail" :show="showDetail" @close="showDetail = false" @addCart="addProduct">
    </DetailProduct>
  </Teleport>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
