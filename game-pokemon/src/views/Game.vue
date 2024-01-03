 
<script setup>
import Card from './Card.vue'
import { useRoute } from 'vue-router';
import routers from '../router';
import { ref, computed, onUnmounted, onBeforeMount } from 'vue'
import ProcessBar from './ProcessBar.vue';


const route = useRoute();
const level = ref(route.params.level);
const gridColumns = ref(`repeat(${route.params.level}, 1fr)`);
const maxwidthProcess = ref(parseInt(route.params.level) * 100);
const pokemons = ref(createPokemon(route.params.level));
const flippedCards = ref([]);
const show = ref(false)
const duration = ref(parseInt(route.params.level) * 10 * 1000)
const elapsed = ref(0)
let lastTime
let handle

onBeforeMount(() => {
    setTimeout(() => {
        show.value = !show.value
    }, 0)
})

function update() {
    elapsed.value = performance.now() - lastTime
    if (elapsed.value >= duration.value) {
        cancelAnimationFrame(handle)
        showResult("You Lose");
    } else {
        handle = requestAnimationFrame(update)
    }
}
function reset() {
    elapsed.value = 0
    lastTime = performance.now()
    update()
}

const completedProcessbar = computed(() =>
    Math.min(elapsed.value / duration.value, 1) * 100
)
reset()

onUnmounted(() => {
    cancelAnimationFrame(handle)
})

function createPokemon(length) {
    let photoUrls = [];
    for (let i = 1; i <= length; i++) {
        photoUrls.push({ id: i, url: '/pokemon/' + i + '.png', alt: 'Photo' + i, isFlipped: true });
    };

    // Double the array photo
    const pairedPhotos = [];
    for (let i = 0; i < photoUrls.length; i++) {
        pairedPhotos.push(...photoUrls);
    }
    // Update the id property in the pairedPhotos array
    pairedPhotos.forEach((item, index) => {
        item.id = index + 1; // Update id using index (add 1 to start from 1)
    });

    // Ramdom the array
    pairedPhotos.sort(() => Math.random() - 0.5);

    const finalList = [];
    for (let i = 0; i < pairedPhotos.length; i++) {
        finalList.push({ id: i, url: pairedPhotos[i].url, alt: pairedPhotos[i].alt, isFlipped: true });
    }

    return finalList;
};
function toggleCard(index) {
    showResult("You win");
    return;
    const selectedCard = this.pokemons[index];
    // Check if the card is already flipped or matched
    if (!selectedCard.isFlipped || this.flippedCards.length >= 2) {
        return;
    }
    selectedCard.isFlipped = !selectedCard.isFlipped;
    this.flippedCards.push(selectedCard);
    if (this.flippedCards.length === 2) {
        setTimeout(() => {
            this.checkForMatch();
        }, 500);
    }
    console.log('toggleCard');
    // Check if all cards are flipped
    if (this.pokemons.every(card => !card.isFlipped)) {
        setTimeout(() => {
            showResult("You win");
        }, 1000);
    }
};
function showResult(message) {
    routers.replace({ name: 'Result', params: { message: message, point: completedProcessbar.value } });
};
function checkForMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.url === card2.url) {
        // Match found, update show property to prevent further interactions with the matched cards
        card1.isFlipped = false;
        card2.isFlipped = false;
    } else {
        // No match, flip the cards back after a short delay
        setTimeout(() => {
            card1.isFlipped = true;
            card2.isFlipped = true;
        }, 300);
    }

    // Clear the flipped cards array
    this.flippedCards = [];
};

</script>
<template>
    <Transition name="bounce">
        <div v-if="show">
            <div class="center-process-bar">
                <ProcessBar :bgcolor="'#6a1b9a'" :completed="completedProcessbar" :maxwidth="maxwidthProcess" />
            </div>
            <div class="grid-container" :style="{ gridTemplateColumns: gridColumns }">
                <div v-for="(item, index) in pokemons" :key="index">
                    <Card :Pokemon="item.url" :isFlipped="item.isFlipped" @card-click="toggleCard(index)" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.grid-container {
    display: grid;
    gap: 10px;
    margin-left: auto;
    margin-right: auto;
}

.center-process-bar {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

