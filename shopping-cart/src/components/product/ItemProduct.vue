<template>
    <div class="item-menu">
        <div class="c-content" @click="showDetailClick(props.item)">
            <img :src="props.item.photos[1].value">
            <div class="c-infor">
                <h3>{{ props.item.name }}</h3>
                <p>{{ props.item.description }}</p>
            </div>
            <div class="c-price">
                <h3 class="lb-price">
                    {{ props.item.price.text }}
                </h3>
            </div>
        </div>
        <div class="c-quantity">
            <div class="btn-update" @click="subCartItem(props.item)">-</div>
            <p>{{ item.quantity }}</p>
            <div class="btn-update" @click="addCartItem(props.item)">+</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';


const props = defineProps({
    item: Object,
})
const emit = defineEmits(['showDetailItem', 'addCart', 'subCart']);
const showDetailClick = (item) => {
    emit('showDetailItem', item);
}
const addCartItem = (item) => {
    emit('addCart', item);
}
const subCartItem = (item) => {
    emit('subCart', item);
}
</script>

<style lang="scss" scoped>
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

.c-content {
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;

    .c-infor {
        width: 60%;
        margin-left: 10px;
    }

    .c-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-left: auto;
        gap: 5px;

        .lb-price {
            color: #ee4d2d;
            font-size: 20px;
        }
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