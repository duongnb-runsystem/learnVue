<script setup>
const props = defineProps({
    Pokemon: String,
    isFlipped: Boolean,
});
const emit = defineEmits(['card-click']);
function handleCardClick() {
    emit('card-click');
}
</script>

<template>
    <div class="card-backside" @click="handleCardClick">
        <div class="card-flip-container" :class="{ flipped: isFlipped }">
            <div class="card-face card-front">
                <img class="imgPokemon" alt="Pokemon" :src=Pokemon />
            </div>
            <div class="card-face card-back">
                <img class="imgPokemon" alt="Pokemon" src="/pokemon/icon_back.png" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-backside {
    width: 150px;
    height: 200px;
    perspective: 1000px;
    cursor: pointer;
}

.card-flip-container {
    width: 100%;
    height: 100%;

    transform-style: preserve-3d;
    transition: transform 0.5s;
}

.flipped {
    transform: rotateY(180deg);
}

.card-face {
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    box-shadow: 0 0 25px rgb(14, 13, 13);
    border-radius: 25px;
}

.card-front {
    background-color: rgba(244, 155, 159, 1);
}

.card-back {
    background-color: rgba(130, 63, 94, 1);
    transform: rotateY(180deg);
}

.imgPokemon {
    max-width: 50%;
    max-height: 50%;
}
</style>