<script>
export default {
    computed: {
        Message() {
            return this.$route.params.message;
        },
    },

};
</script>
<template>
    <h1>{{ Message }}</h1>
</template>