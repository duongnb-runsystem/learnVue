 
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
const heightDefaultCard = ref(190);
const widthDefaultCard = ref(130);
const ratio = ref(1);
onMounted(() => {
    setTimeout(() => {
        show.value = !show.value
    }, 0)
    const lv = parseInt(localStorage.getItem('level'));
    pokemons.value = createPokemon(lv);
    switch (lv) {
        case 4:
            ratio.value = 1;
            duration.value = 30 * 1000;
            break;
        case 6:
            ratio.value = 0.65;
            duration.value = 40 * 1000;
            break;
        case 8:
            ratio.value = 0.48;
            duration.value = 50 * 1000;
            break;
        case 10:
            ratio.value = 0.37;
            duration.value = 60 * 1000;
            break;
    }
    heightCard.value = `${heightDefaultCard.value * ratio.value}px`;
    widthCard.value = `${widthDefaultCard.value * ratio.value}px`;
    maxWidthProcess.value = ((widthDefaultCard.value * ratio.value + 10) * lv) - 20;// 10 is gap between card, 20 is margin left and right
    gridColumns.value = `repeat(${lv}, ${widthCard.value})`;

    playSound("audioBackground");
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
    var time = duration.value - elapsed.value;
    if (time <= 4 * 1000) {
        pauseSound("audioBackground")
        playSound("audioDanger")
        return "red";
    } else if (time <= 20 * 1000) {
        return "orange";
    } else {
        return "green";
    }
});
reset()

onUnmounted(() => {
    cancelAnimationFrame(handle.value)
    pauseSound("audioBackground");
})

const createPokemon = (length) => {
    const photoUrls = [];
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
    var time = parseInt(duration.value - elapsed.value).toFixed();
    var point = time < 0 ? 0 : time;
    if (message == "You win") {
        var key = "rankPoints" + route.params.level;
        var rankPoints = JSON.parse(localStorage.getItem(key));
        if (rankPoints === null)
            rankPoints = [];
        rankPoints.push(point);
        rankPoints.sort((a, b) => b - a);
        rankPoints.splice(10);
        localStorage.setItem(key, JSON.stringify(rankPoints));
    }
    localStorage.setItem('point', point);
    localStorage.setItem('message', message);
    routers.replace({ name: 'Result' });
};
const playSound = (id) => {
    var playSoundStorage = localStorage.getItem('playSound');
    if (playSoundStorage === "false")
        return;
    var audio = document.getElementById(id);
    audio.play();
}
const pauseSound = (id) => {
    var playSoundStorage = localStorage.getItem('playSound');
    if (playSoundStorage === "false")
        return;
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

    } else {
        playSound("audioToggleFail")
        // No match, flip the cards back after a short delay
        setTimeout(() => {
            card1.isFlipped = true;
            card2.isFlipped = true;

        }, 500);
    }
    card1.isSelected = false;
    card2.isSelected = false;
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
                    :pokemon="item.url" :isFlipped="item.isFlipped" :isSelected="item.isSelected"
                    @card-click="toggleCard(index)" />
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

