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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDataShopCommon, dataDetailShop, formatVND } from '@/core/utils/common.js';
import { useRestaurantStore } from '@/stores/restaurant.js';
import { useCommonStore } from '@/stores/_common.js';

const menu = ref(null);
const showDetail = ref(false);
const searchTerm = ref('')
const cart = ref([])
const dataCategory = ref([]);
const listProduct = ref(null);
const itemDetail = ref(null);
const showOrderCart = ref(false);
const db = getDatabase();
const urldb = ref('');
const urlShop = ref('');
const address = ref(null);
const kind = ref(null);
const name = ref(null);
const rattingCount = ref(null);
const rattingStart = ref(null);
const minOrder = ref(null);
const maxOrder = ref(null);
const urlImgThumb = ref(null);
const phone = ref(null);
const showDetailShop = ref(false);

const syncCartWithFirebase = () => {
  const dataRef = dbRef(db, urldb.value);
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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user.uid;
    } else {
      return null
    }
  });
}
onMounted(async () => {
  const data = useRestaurantStore()?.getRestaurant;
  urlShop.value = data?.restaurant_url ?? localStorage.getItem('urlShop');
  getData(urlShop.value)
  getDataDetailShop(urlShop.value);
  localStorage.setItem('urlShop', urlShop.value);
  urldb.value = getIdAuth() + "/" + urlShop.value;
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
const getDataDetailShop = async (url) => {
  const data = await dataDetailShop(url);
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
  showDetailShop.value = true;
}
const showDetailClick = (item) => {
  itemDetail.value = item;
  showDetail.value = true;
}
const saveCartToFireBase = () => {
  const dataRef = dbRef(db, urldb.value);
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
  let existItem = cart?.value?.find((itemCart) => itemCart?.id === item?.id);
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
  <div class="c-hearder-banner" v-if="showDetailShop">
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
      <a href="https://foody.vn/ho-chi-minh/highlands-coffee-bach-dang" rel="noopener noreferrer nofollow" target="_blank"
        class="number-review">Xem thêm lượt đánh giá từ Foody</a>
      <p><span class="sttOpen">● Mở cửa</span> - <span class="timeOpen">🕖 07:00 ~ 22:00</span></p>
      <div class="const-restaurant">
        <font-awesome-icon :icon="['fas', 'money-bill-wave']" />
        <span> {{ minOrder }} ~ {{ maxOrder }}</span>
      </div>
    </div>
  </div>

  <div class="col-content">
    <div class="col-left">
      <ListMenu :data="dataCategory" @scrollCategory="scrollCategory" v-if="dataCategory.length > 0"></ListMenu>
    </div>
    <div class="center-content">
      <input class="f-search" v-model="searchTerm" placeholder="Tìm Món ..." v-if="dataCategory.length > 0">
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
