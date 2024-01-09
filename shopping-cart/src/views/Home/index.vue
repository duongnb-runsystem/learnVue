<script setup>
import service from '@/services/axios.service.js';

import axios from 'axios';
import { ref, computed } from 'vue';
import DetailProduct from '@/components/product/DetailProduct.vue';
import ListProduct from '@/components/product/ListProduct.vue';


const menu = ref(null);
const nameProduct = ref(null);
const priceProduct = ref(null);
const imgProduct = ref(null);
const descriptionProduct = ref(null);
const showDetail = ref(false);
const priceDiscount = ref();
const searchTerm = ref('')

const getDeliveryUrl = (url) => {
  var rs = url.replace("https://shopeefood.vn/", "");
  return rs;
}
const getData = async () => {
  // url shop
  var urlShop = "https://shopeefood.vn/ho-chi-minh/highlands-coffee-bach-dang";
  //get id shop
  var deliveryUrl = getDeliveryUrl(urlShop);
  console.log("deliver url :" + deliveryUrl);
  var rsIdShop = await service.get(`api/delivery/get_from_url?url=${deliveryUrl}`);
  var idShop = rsIdShop.data.reply.delivery_id;
  console.log("id shop:" + rsIdShop.data.reply.delivery_id);
  //get menu
  const res = await service.get(`api/dish/get_delivery_dishes?id_type=2&request_id=${idShop}`);
  console.log(res);
  menu.value = res.data.reply.menu_infos;
  console.log(menu.value);
}
getData();

const showDetailClick = (categoryIndex, itemIndex) => {
  console.log("index emit compoment parent" + categoryIndex + ' ' + itemIndex);
  var itemchild = menu.value[categoryIndex].dishes[itemIndex];

  // console.log(index, indexChild);
  showDetail.value = true;
  nameProduct.value = itemchild.name;
  priceProduct.value = itemchild.price.text;
  imgProduct.value = itemchild.photos[3].value;
  descriptionProduct.value = itemchild.description;
  priceDiscount.value = menu.value[categoryIndex]?.is_group_discount === true ? itemchild.discount_price.text : "-1";
}

</script>

<template>
  <div class="col-content">
    <div class="left">
      <div class="left-content">
        <h1>Menu</h1>
        <div class="left-menu">
          <h3 v-for="item in menu">{{ item.dish_type_name }}</h3>
        </div>
      </div>
    </div>
    <div class="col-content-center">
      <input class="f-search" v-model="searchTerm" placeholder="Search...">
      <ListProduct :menu="menu" :querry="searchTerm" @showDetailEmit="showDetailClick"></ListProduct>
    </div>
    <div class="col-content-right">
      <h1>qr</h1>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <DetailProduct :show="showDetail" @close="showDetail = false" :name="nameProduct" :price="priceProduct"
      :img="imgProduct" :description="descriptionProduct" :priceDiscount="priceDiscount">
    </DetailProduct>
  </Teleport>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
