 
<script setup >
import Card from '@/components/Card.vue'
import { useRoute } from 'vue-router';
import routers from '@/router';
import { ref, computed, onUnmounted, onBeforeMount, onMounted } from 'vue'
import ProcessBar from '@/components/ProcessBar.vue'


const route = useRoute();
const gridColumns = ref('');
const maxWidthProcess = ref();
const pokemons = ref();
const flippedCards = ref([]);
const show = ref(false)
const duration = ref()
const elapsed = ref(0)
const lastTime = ref();
const handle = ref();
const widthCard = ref();
const heightCard = ref();
const point = ref(0);
onBeforeMount(() => {
    setTimeout(() => {
        show.value = !show.value
    }, 0)

    var lv = parseInt(route.params.level);
    pokemons.value = createPokemon(lv);
    maxWidthProcess.value = lv * 100;
    switch (lv) {
        case 4:
            heightCard.value = `200px`;
            widthCard.value = `130px`;
            duration.value = 30 * 1000;
            break;
        case 6:
            heightCard.value = `127px`;
            widthCard.value = `95px`;
            duration.value = 40 * 1000;
            break;
        case 8:
            heightCard.value = `91px`;
            widthCard.value = `69px`;
            duration.value = 50 * 1000;
            break;
        case 10:
            heightCard.value = `75px`;
            widthCard.value = `70px`;
            duration.value = 60 * 1000;
            break;
    }
    gridColumns.value = `repeat(${route.params.level}, ${widthCard.value})`;
})
onMounted(() => {
    // playSound("audioBackground");
})
const update = () => {
    elapsed.value = performance.now() - lastTime.value
    if (elapsed.value >= duration.value) {
        cancelAnimationFrame(handle.value)
        showResult("You Lose");
    } else {
        handle.value = requestAnimationFrame(update)
    }
}
const reset = () => {
    elapsed.value = 0
    lastTime.value = performance.now()
    update()
}

const completedProcessbar = computed(() => {
    const result = Math.min(elapsed.value / duration.value, 1) * 100
    return result;
})
const colorProcess = computed(() => {
    if ((duration.value - elapsed.value) < 4 * 1000) {
        playSound("audioDanger")
        return "red";
    } else if ((duration.value - elapsed.value) > 20 * 1000) {
        return "orange";
    } else {
        return "green";
    }
});
reset()

onUnmounted(() => {
    cancelAnimationFrame(handle.value)
})

const createPokemon = (length) => {
    let photoUrls = [];
    for (let i = 1; i <= length; i++) {
        photoUrls.push({ id: i, url: '/pokemon/' + i + '.png', alt: 'Photo' + i, isFlipped: true, isSelected: false });
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
const toggleCard = (index) => {
    // showResult("You win");
    // return;
    const selectedCard = pokemons.value[index];
    // Check if the card is already flipped or matched
    if (!selectedCard.isFlipped || flippedCards.value.length >= 2) {
        return;
    }
    selectedCard.isFlipped = !selectedCard.isFlipped;
    selectedCard.isSelected = true;
    flippedCards.value.push(selectedCard);
    if (flippedCards.value.length === 2) {
        setTimeout(() => {
            checkForMatch();
        }, 500);
    }
    // Check if all cards are flipped
    if (pokemons.value.every(card => !card.isFlipped)) {
        setTimeout(() => {
            showResult("You win");
        }, 1000);
    }
};
const showResult = (message) => {
    console.log(point.value);
    routers.replace({ name: 'Result', params: { message: message, point: point.value } });
};
const playSound = (id) => {
    var audio = document.getElementById(id);
    audio?.play();
}
const pauseSound = (id) => {
    var audio = document.getElementById(id);
    audio?.pause();
}

const checkForMatch = () => {
    const [card1, card2] = flippedCards.value;
    if (card1.url === card2.url) {
        playSound("audioToggleTrue")
        // Match found, update show property to prevent further interactions with the matched cards
        card1.isFlipped = false;
        card2.isFlipped = false;
        point.value += 10;
    } else {
        playSound("audioToggleFail")
        // No match, flip the cards back after a short delay
        setTimeout(() => {
            card1.isFlipped = true;
            card2.isFlipped = true;
        }, 500);
    }

    // Clear the flipped cards array
    flippedCards.value = [];
};

</script>
<template>
    <audio id="audioBackground" hidden="true">
        <source src="@/assets/sound/soundBackground.mp3" type="audio/mpeg">
    </audio>
    <audio id="audioToggleFail" hidden="true">
        <source src="@/assets/sound/soundNopecut.mp3" type="audio/mpeg">
    </audio>
    <audio id="audioToggleTrue" hidden="true">
        <source src="@/assets/sound/soundCollect.mp3" type="audio/mpeg">
    </audio>
    <audio id="audioDanger" hidden="true">
        <source src="@/assets/sound/soundDanger.mp3" type="audio/mpeg">
    </audio>
    <Transition name="bounce">
        <div v-if="show">
            <div class="center-process-bar">
                <ProcessBar :completed="completedProcessbar" :maxWidth="maxWidthProcess" :colorProcess="colorProcess" />
            </div>
            <div class="grid-container" :style="{ gridTemplateColumns: gridColumns }">
                <Card v-for="( item, index ) in  pokemons " :style="{ width: widthCard, height: heightCard }" :key="index"
                    :Pokemon="item.url" :isFlipped="item.isFlipped" @card-click="toggleCard(index)" />
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
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-top: 20px;
}

.center-process-bar {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

