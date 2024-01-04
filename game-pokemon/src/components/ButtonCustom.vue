<script setup>
const props = defineProps({
    label: String,
    rank: String,
})
</script>
<template>
    <div class="button-select-level">
        <span class="span-title">{{ label }}</span>
        <span class="span-rank">{{ rank }}</span>
    </div>
</template>
<style scoped>
.button-select-level {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    border: 2px solid #EE9d9d;
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-color: transparent;
}

.button-select-level:hover {
    background-color: #EE9d9d;
}

.button-select-level:hover .span-rank {
    color: white;
}

.button-select-level:hover .span-title {
    color: white;
}


.span-title {
    font-size: 30px;
    color: #EE9d9d;
    font-family: "Copperplate", cursive;
}

.span-rank {
    font-size: 20px;
    color: #EE9d9d;
    font-family: "Copperplate", cursive;
}
</style>