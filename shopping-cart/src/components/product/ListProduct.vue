<script setup>
import { computed, onMounted } from 'vue'
import ItemProduct from '@/components/product/ItemProduct.vue'
const props = defineProps({
    id: String,
    menu: Array,
    querry: String
})

const fillterData = computed(() => {
    if (props.querry) {
        let data = [];
        // find item in menu by querry
        props.menu.forEach(item => {
            let i = item.dishes.filter(itemDish => itemDish.name.toLowerCase().includes(props.querry));
            if (i.length > 0) {
                data.push({ idItem: item.dish_type_id, itemFillter: i });
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
const showDetailItemEmit = (item) => {
    emit('showDetailEmit', item);
}
const addCartItem = (item) => {
    emit('addCart', item);
}
const subCartItem = (item) => {
    emit('subCart', item);
}

</script>
<template>
    <div v-if="fillterData?.length">
        <div v-for="data in fillterData" :id="data.idItem">
            <div v-for="item in data.itemFillter" :id="item.id">
                <ItemProduct @showDetailItem="showDetailItemEmit" :item="item" @subCart="subCartItem"
                    @addCart="addCartItem">
                </ItemProduct>
            </div>
        </div>
    </div>

    <div v-else v-for="(category) in menu" :id="category.dish_type_name">
        <h1>{{ category.dish_type_name }}</h1>
        <div v-for="item in category.dishes" :id="item.id">
            <ItemProduct @showDetailItem="showDetailItemEmit" :item="item" @subCart="subCartItem" @addCart="addCartItem">
            </ItemProduct>
        </div>
    </div>
</template>
<style scoped lang="scss"></style>