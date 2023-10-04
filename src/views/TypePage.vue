<script>
import DataTable from '../components/DataTable.vue'

export default {
    name: "TypePage",
    emits: ["handleFetchTypes", "changePage"],
    props: ["typeList"],
    components: { DataTable },
    data() {
        return {
            newTypePage: 'new-type',
            typeColumns: [
                "#",
                "Name",
            ]
        }
    },
    methods: {
        handleToNewTypePage() {
            this.$emit("changePage", this.newTypePage)
        }
    },
    created() {
        this.$emit("handleFetchTypes")
    }
}
</script>

<template>
    <section id="type-section" class="lodging-section">
        <div class="section-header">
            <h1>Types</h1>
            <button id="new-type" class="add-button" @click.prevent="handleToNewTypePage">
                <span class="icon material-symbols-outlined">heart_plus</span>New
                type
            </button>
        </div>
        <div class="table-container">
            <table class="lodging-table">
                <thead>
                    <tr>
                        <th v-for="col in typeColumns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <DataTable v-for="type in typeList[0]" :key="type.id" :data="type" />
            </table>
        </div>
    </section>
</template>