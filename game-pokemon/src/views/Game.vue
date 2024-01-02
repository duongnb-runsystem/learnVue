 
<script>
import Card from './Card.vue'
import router from '../router';
export default {
    computed: {
        gridColumns() {
            return `repeat(${this.$route.params.level}, 1fr)`;
        },
        progressRate() {
            let result = Math.min(this.elapsed / this.duration, 1)
            return result;
        },

    },
    data() {
        return {
            flippedCards: [],
            pokemons: this.createPokemon(this.$route.params.level),
            progress: 0,
            maxProgress: 150, // 15 seconds * 10 steps per second is 150
            intervalId: null,
            startTime: null,
            elapsedTime: null,
        };
    },
    methods: {
        createPokemon(length) {
            console.log('createPokemon' + length);
            let photoUrls = [];
            for (let i = 1; i <= length; i++) {
                console.log('photo id' + i)
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
        },
        toggleCard(index) {
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
                    router.replace({ name: 'Result', params: { message: "You Win" } });
                }, 200);
            }
        },
        showLoseGame() {
            router.replace({ name: 'Result', params: { message: "You Lose" } });
        },
        checkForMatch() {
            const [card1, card2] = this.flippedCards;

            if (card1.url === card2.url) {
                console.log('Same');
                // Match found, update show property to prevent further interactions with the matched cards
                card1.isFlipped = false;
                card2.isFlipped = false;
            } else {
                console.log('Not Same');
                // No match, flip the cards back after a short delay
                setTimeout(() => {
                    card1.isFlipped = true;
                    card2.isFlipped = true;
                }, 300);
            }

            // Clear the flipped cards array
            this.flippedCards = [];
        },
        startCountdown() {
            this.progress = 0;
            this.startTime = performance.now();

            this.intervalId = setInterval(() => {
                this.updateProgress();
            }, 100); // Update every 100 milliseconds
        },
        updateProgress() {
            this.progress += 1;
            const currentTime = performance.now();
            this.elapsedTime = (currentTime - this.startTime) / 1000; // Convert to seconds

            if (this.progress >= this.maxProgress) {
                this.stopCountdown();
            }
        },
        stopCountdown() {
            clearInterval(this.intervalId);
            this.showLoseGame();
        },
    },
    mounted() {
        this.startCountdown();
    },
    beforeUnmount() {
        // Make sure to clear the interval when the component is destroyed
        this.stopCountdown();
    },
};

</script>
<template>
    <div class="grid-container" :style="{ gridTemplateColumns: gridColumns }">
        <div v-for="(item, index) in pokemons" :key="index">
            <Card :Pokemon="item.url" :isFlipped="item.isFlipped" @card-click="toggleCard(index)" />
        </div>
    </div>
    <progress :value="progress" :max="maxProgress"></progress>
</template>

<style scoped>
.grid-container {
    display: grid;
    gap: 10px;
    margin-left: auto;
    margin-right: auto;
}
</style>

