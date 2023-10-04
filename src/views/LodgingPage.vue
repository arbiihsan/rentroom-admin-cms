<script>
import DataTable from '../components/DataTable.vue'

export default {
    name: "LodgingPage",
    emits: ["changePage", "handleFetchLodgings", "handleUpdateStatus", "handlePassingLodgingData"],
    props: ["lodgingList"],
    components: { DataTable },
    data() {
        return {
            newLodgingPage: 'new-lodging',
            editLodgingPage: 'edit-lodging',
            lodgingColumns: [
                "#",
                "Name",
                "Facility",
                "Room Capacity",
                "Image",
                "Author Name",
                "Location",
                "Price",
                "Type",
                "Status & Action"
            ],
            setInterval: 0,
            statusList: ["Active", "Inactive", "Archived"]
        }
    },
    methods: {
        handleToNewLodgingPage() {
            this.$emit("changePage", this.newLodgingPage)
        },
        handleUpdateStatus(newStatus, lodgingId) {
            this.$emit("handleUpdateStatus", newStatus, lodgingId)
        },
        handleToEditLodgingPage() {
            this.$emit("changePage", this.editLodgingPage)
        },
        handlePassingLodgingData(lodgingData) {
            this.$emit("handlePassingLodgingData", lodgingData)
        }
    },
    created() {
        // console.log(this.lodgingList, '<<<< ini dari lodgingPage');
        this.$emit("handleFetchLodgings")
    }
}
</script>

<template>
    <section id="lodging-section" class="lodging-section">
        <div class="section-header">
            <h1>Lodgings</h1>
            <button id="new-lodging" class="add-button" @click.prevent="handleToNewLodgingPage">
                <span class="icon material-symbols-outlined">add_home_work</span> <span>New lodging</span>
            </button>
        </div>
        <!-- <pre>{{ lodgingList[0] }}</pre> -->
        <div class="table-container">
            <table class="lodging-table">
                <thead>
                    <tr>
                        <th v-for="col in lodgingColumns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <DataTable v-for="lodging in lodgingList[0]" :key="lodging.id" :data="lodging" :columns="lodgingColumns"
                    @handleUpdateStatus="handleUpdateStatus" @handleToEditLodgingPage="handleToEditLodgingPage" @handlePassingLodgingData="handlePassingLodgingData"/>
            </table>
        </div>
    </section>
</template>

