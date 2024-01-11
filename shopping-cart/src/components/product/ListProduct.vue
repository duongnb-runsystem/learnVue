<script setup>
import { computed } from 'vue'
const props = defineProps({
    id: String,
    menu: Array,
    querry: String
})
const fillterData = computed(() => {
    if (props.querry) {
        console.log(props.querry);
        let data = [];
        // find item in menu by querry
        props.menu.forEach(item => {
            let i = item.dishes.filter(itemDish => itemDish.name.toLowerCase().includes(props.querry));
            if (i.length > 0) {
                data.push(i);
            }
        });
        return data;
    }
})
const emit = defineEmits(['showDetailEmit', 'addCart', 'subCart']);
const scrollToItem = (item) => {
    let indexScroll = -1;
    props.menu.forEach((element, index) => {
        if (element.dish_type_name === item) {
            indexScroll = index;
        }
    });

    if (indexScroll === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
        let element = document.getElementById(item);
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
defineExpose({
    scrollToItem,
})
</script>
<template>
    <div v-if="fillterData?.length" v-for="(category) in fillterData">
        <div class="item-menu" v-for="(item) in category">
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
                <p>{{ item.quantity }}</p>
                <div class="btn-update" @click="emit('addCart', item)">+</div>
            </div>
        </div>
    </div>

    <div v-else :id="category.dish_type_name" v-for="(category) in menu">
        <h1>{{ category.dish_type_name }}</h1>
        <div class="item-menu" v-for="(item) in category.dishes">
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
                <p>{{ item.quantity }}</p>
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
        font-weight: 700;
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
    margin-top: 10px;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;

    .c-content {
        top: 0;
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