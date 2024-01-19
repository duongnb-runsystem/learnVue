<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import DetailProduct from '@/components/product/DetailProduct.vue';
import ListProduct from '@/components/product/ListProduct.vue';
import ListCart from '@/components/product/ListCart.vue';
import ListMenu from '@/components/product/ListMenu.vue';
import OrderCart from '@/components/product/OrderCart.vue';
import { useCartStore } from '@/stores/carts.js'
import fireBaseApp from '@/firebase.js';
import { getDatabase, ref as dbRef, set, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getDataShopCommon } from '@/core/utils/common';
import { useRouter } from 'vue-router';
import { useRestaurantStore } from '@/stores/restaurant.js';

const router = useRouter();
const menu = ref(null);
const showDetail = ref(false);
const searchTerm = ref('')
const cart = ref([])
const dataCategory = ref([]);
const listProduct = ref(null);
const itemDetail = ref(null);
const showOrderCart = ref(false);
const db = getDatabase();

const syncCartWithFirebase = () => {
  const userId = getIdAuth();
  const dataRef = dbRef(db, userId);
  onValue(dataRef, (snapshot) => {
    cart.value = snapshot.val() === null ? [] : snapshot.val();
    menu.value.forEach(itemMenu => {
      itemMenu.dishes.forEach(itemDish => {
        let existItem = cart.value.find((itemCart) => itemCart.id === itemDish.id);
        if (existItem) {
          itemDish.quantity = existItem.quantity;
        }
      });
    });
  });
}
const getIdAuth = () => {
  const auth = getAuth(fireBaseApp);
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    return null
  }
}
onMounted(() => {
  const data = useRestaurantStore().getRestaurant;
  if (data) {
    const url = data.restaurant_url;
    getData(url)
  }
})
const getData = async (url) => {
  const res = await getDataShopCommon(url);
  menu.value = res.data.reply.menu_infos.filter(item => item.dish_type_id !== -1);
  menu.value.forEach(itemMenu => {
    itemMenu.dishes.forEach(itemDish => {
      itemDish.quantity = 0;
    });
  })
  //get data cart from firebase  
  syncCartWithFirebase();

  menu.value.forEach(item => {
    dataCategory.value.push({ id: item.id, name: item.dish_type_name });
  });
}

const showDetailClick = (item) => {
  itemDetail.value = item;
  showDetail.value = true;
}
const saveCartToFireBase = () => {
  const userId = getIdAuth();
  const dataRef = dbRef(db, userId);
  set(dataRef, cart.value);
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
    saveCartToFireBase();
  } else {
    // If the item does not exist, set its quantity to 1 and add it to the cart
    item.quantity = 1;
    cart.value.push(item);
    // save cart to local storage
    saveCartToFireBase();
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
    saveCartToFireBase();
  }
}

const removeCartClick = (item) => {
  item.quantity = 0;
  syncQuantityIntoMenu(item);
  cart.value = cart.value.filter((itemCart) => itemCart.id !== item.id);

  saveCartToFireBase();
}

const scrollCategory = (item) => {
  listProduct.value.scrollToItem(item.name);
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
  saveCartToFireBase();
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
