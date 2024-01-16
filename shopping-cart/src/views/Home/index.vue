<script setup>
import common from '@/core/utils/common.js';
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import DetailProduct from '@/components/product/DetailProduct.vue';
import ListProduct from '@/components/product/ListProduct.vue';
import ListCart from '@/components/product/ListCart.vue';
import ListMenu from '@/components/product/ListMenu.vue';
import OrderCart from '@/components/product/OrderCart.vue';
import { useCartStore } from '@/stores/carts.js'
const menu = ref(null);
const showDetail = ref(false);
const searchTerm = ref('')
const cart = ref([])
const dataCategory = ref([]);
const listProduct = ref(null);
const itemDetail = ref(null);
const showOrderCart = ref(false);
onMounted(() => {
  console.log('mounted home');
  getData();
});
onBeforeMount(() => {
  console.log('before mount home');
});
const getData = async () => {
  console.log('get data store')
  console.log(useCartStore().getCarts);
  const res = common.dataShop;
  menu.value = res.data.reply.menu_infos.filter(item => item.dish_type_id !== -1);
  console.log(menu.value);
  // get data cart from local storage
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
  if (cartFromLocalStorage) {
    cart.value = cartFromLocalStorage;
  }
  // update data quantity from cart to menu
  menu.value.forEach(itemMenu => {
    itemMenu.dishes.forEach(itemDish => {
      let existItem = cart.value.find((itemCart) => itemCart.id === itemDish.id);
      if (existItem) {
        itemDish.quantity = existItem.quantity;
      }
    });
  });
  menu.value.forEach(item => {
    dataCategory.value.push(item.dish_type_name);
  });

}
// getData();

const showDetailClick = (item) => {
  itemDetail.value = item;
  showDetail.value = true;
}
const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
  useCartStore().setCarts(cart.value);
  console.log(useCartStore().getCarts);
}
const syncQuantityIntoMenu = (item) => {
  menu.value.forEach(itemMenu => {
    itemMenu.dishes.forEach(itemDish => {
      if (itemDish.id === item.id) {
        itemDish.quantity = item.quantity;
      }
    });
  });
}
const addProduct = (item) => {
  showDetail.value = false;
  // Check if the item already exists in the cart
  let existItem = cart.value.find((itemCart) => itemCart.id === item.id);
  if (existItem) {
    // If the item already exists, increase its quantity by 1
    existItem.quantity++;
    syncQuantityIntoMenu(existItem);
    // save cart to local storage
    saveCartToLocalStorage();
  } else {
    // If the item does not exist, set its quantity to 1 and add it to the cart
    item.quantity = 1;
    cart.value.push(item);
    // save cart to local storage
    saveCartToLocalStorage();
  }
}

const subProduct = (item) => {
  let existItem = cart.value.find((itemCart) => itemCart.id === item.id);
  if (existItem) {
    existItem.quantity--;
    syncQuantityIntoMenu(existItem);
    if (existItem.quantity === 0) {
      cart.value = cart.value.filter((itemCart) => itemCart.id !== item.id);
    }
    saveCartToLocalStorage();
  }
}

const removeCartClick = (item) => {
  item.quantity = 0;
  syncQuantityIntoMenu(item);
  cart.value = cart.value.filter((itemCart) => itemCart.id !== item.id);

  saveCartToLocalStorage();
}

const scrollCategory = (item) => {
  listProduct.value.scrollToItem(item);
}

const orderCart = () => {
  alert("Đặt hàng thành công");
  cart.value.forEach(item => {
    item.quantity = 0;
  });
  menu.value.forEach(itemMenu => {
    itemMenu.dishes.forEach(itemDish => {
      itemDish.quantity = 0;
    });
  })
  cart.value = [];
  saveCartToLocalStorage();
  showOrderCart.value = false;
}
</script>

<template>
  <div class="col-content">
    <div class="col-left">
      <ListMenu :data="dataCategory" @scrollCategory="scrollCategory"></ListMenu>
    </div>
    <div class="center-content">
      <input class="f-search" v-model="searchTerm" placeholder="Tìm Món ...">
      <ListProduct ref="listProduct" :menu="menu" :querry="searchTerm" @showDetailEmit="showDetailClick"
        @addCart="addProduct" @subCart="subProduct">
      </ListProduct>
    </div>
    <div class="col-right">
      <ListCart :data="cart" @removeCart="removeCartClick" @orderCart="showOrderCart = true;"></ListCart>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <DetailProduct :item="itemDetail" :show="showDetail" @close="showDetail = false" @addCart="addProduct">
    </DetailProduct>
    <OrderCart :show="showOrderCart" :data="cart" @confirm="orderCart" @close="showOrderCart = false">
    </OrderCart>
  </Teleport>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
