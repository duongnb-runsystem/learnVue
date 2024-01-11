<script setup>
/**
 * Layout: use for pages're logged
 */
</script>

<template>
  <div class="base-layout">
    <header>
      <div class="c-hearder-banner">
        <img class="img-banner"
          src="https://images.foody.vn/res/g70/693694/prof/s640x400/image-1d85bd0c-231130145509.jpeg" />
        <div class="c-hearder-infor">
          <p class="kind-restaurant">CAFÉ/DESSERT</p>
          <h1 class="name-restautant">Highlands Coffee - 58E Bạch Đằng</h1>
          <p class="add-restautant">58E Bạch Đằng, P. 2, Tân Bình, TP. HCM</p>
          <div class="rating">
            <font-awesome-icon v-for="item in 5" class="start" :icon="['fas', 'star']" />
            <span class="countRate"> 999+</span>
            đánh giá trên ShopeeFood
          </div>
          <a href="https://foody.vn/ho-chi-minh/highlands-coffee-bach-dang" rel="noopener noreferrer nofollow"
            target="_blank" class="number-review">Xem thêm lượt đánh giá từ Foody</a>
          <p><span class="sttOpen">● Mở cửa</span> - <span class="timeOpen">🕖 07:00 ~ 22:00</span></p>
          <div class="const-restaurant">
            <font-awesome-icon :icon="['fas', 'money-bill-wave']" />
            <span> 40,000 - 70,000</span>
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
