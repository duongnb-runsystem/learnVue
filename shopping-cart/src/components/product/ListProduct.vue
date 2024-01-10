<script setup>
const props = defineProps({
    id: String,
    menu: Array,
    querry: String
})

const emit = defineEmits(['showDetailEmit', 'addCart', 'subCart']);
const scrollToItem = (item) => {
    var element = document.getElementById(item);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
</script>
<template>
    <div :id="category.dish_type_name" v-for="(category, categoryIndex) in menu">
        <h1>{{ category.dish_type_name }}</h1>
        <div class="item-menu" v-for="(item, itemIndex) in category.dishes">
            <div class="c-content" @click="emit('showDetailEmit', item)">
                <img :src="item.photos[1].value">
                <div class="c-infor">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.description }}</p>
                </div>
                <div class="c-price">
                    <h3 class="lb-price" :class="{ isDiscount: category?.is_group_discount ?? false }">
                        {{ item.price.text }}
                    </h3>
                    <h3 class="lb-price" v-if="category?.is_group_discount === true ?? false">
                        {{ item.discount_price.text }}
                    </h3>
                </div>
            </div>
            <div class="c-quantity">
                <div class="btn-update" @click="emit('subCart', item)">-</div>
                <p class="">{{ item.quantity }}</p>
                <div class="btn-update" @click="emit('addCart', item)">+</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.c-quantity {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        font-size: 20px;
        width: 30px;
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        margin-right: 10px;
    }

    .btn-update {
        font-size: 22px;
        cursor: pointer;
        font-weight: 700;
        width: 30px;
        height: 30px;
        display: flex;
        border-radius: 10px;
        margin-left: auto;
        margin-right: 10px;
        align-items: center;
        justify-content: center;
        background-color: #ee4d2d;
        color: #fff;
    }

}

.item-menu {
    display: flex;
    background-color: #fff;
    border-radius: 15px;
    margin-bottom: 10px;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;

    .c-content {
        width: 100%;
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
    }

    .c-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-left: auto;
        gap: 5px;
    }



    .lb-price {
        color: #ee4d2d;
        font-size: 20px;
    }

    .isDiscount {
        color: #888888;
        font-size: 15px;
        text-decoration: line-through;
    }

    .c-infor {
        width: 60%;
        margin-left: 10px;
    }

    img {
        width: auto;
        height: auto;
    }
}
</style>