<script setup>
import axios from 'axios';
import { ref } from 'vue';
import DetailProduct from '@/components/DetailProduct.vue';
const data = ref(null);
const nameProduct = ref(null);
const priceProduct = ref(null);
const imgProduct = ref(null);
const descriptionProduct = ref(null);
const instance = axios.create({
  headers: {
    'x-foody-client-type': '1',
    'x-foody-client-id': '',
    'x-foody-client-language': 'vi',
    'x-foody-client-version': '3.0.0',
    'x-foody-access-token': '',
    'x-foody-api-version': '1',
    'x-foody-app-type': '1004'
  }

})
const getData = async () => {
  const res = await instance.get('api/dish/get_delivery_dishes?id_type=2&request_id=16980');
  data.value = res.data.reply.menu_infos;
  console.log(data.value);
}
getData();
const showDetail = ref(false);
const showDetailClick = (index, indexChild) => {

  var itemchild = data.value[index].dishes[indexChild];

  console.log(index, indexChild);
  showDetail.value = true;
  nameProduct.value = itemchild.name;
  priceProduct.value = itemchild.price.text;
  imgProduct.value = itemchild.photos[2].value;
  descriptionProduct.value = itemchild.description;
  console.log(itemchild.description);
  console.log(nameProduct.value + priceProduct.value + imgProduct.value);
}
</script>

<template>
  <main>

    <div v-for="(item, index) in data">
      <h2>{{ item.dish_type_name }}</h2>
      <div v-for="(itemChild, indexChild) in item.dishes" style="display: flex;"
        @click="showDetailClick(index, indexChild)">
        <img :src="itemChild.photos[1].value">
        <div style="margin-left: 10px;">
          <h3>
            {{ itemChild.name }} - {{ itemChild.price.text }}
          </h3>
          <p>
            {{ itemChild.description }}
          </p>
        </div>


      </div>
    </div>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <DetailProduct :show="showDetail" @close="showDetail = false" :name="nameProduct" :price="priceProduct"
        :img="imgProduct" :description="descriptionProduct">
        <template #header>
          <h3>custom header</h3>
        </template>
      </DetailProduct>
    </Teleport>
  </main>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
