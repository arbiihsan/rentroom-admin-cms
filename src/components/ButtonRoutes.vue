<script>
export default {
    name: 'ButtonRoutes',
    emits: ["changePage"],
    props: ["buttonName", "page"],
    data() {
        return {
        }
    },
    methods: {
        handleToRoute() {
            this.$emit("changePage", this.page)
        }
    }
}
</script>

<template>
    <button class="register_button" id="register-button" @click.prevent="handleToRoute">{{ buttonName }}</button>
</template>