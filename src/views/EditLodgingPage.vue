<script>
import DataForm from "@/components/DataForm.vue";

export default {
    name: "EditLodgingPage",
    components: {
        DataForm
    },
    emits: ["changePage", "handleEditLodging", "handleFetchTypes"],
    props: ["typeList", "selectedLodgingData"],
    methods: {
        handleToLodging() {
            this.$emit("changePage", "lodgings");
        },
        handleSubmit(formData) {
            // console.log(formData, '<<<dari editlodgingpage');
            this.$emit("handleEditLodging", formData);
        }
    },
    created() {
        this.$emit("handleFetchTypes")
    }

}
</script>

<template>
    <section id="new-lodging-section" class="new-lodging-section">
        <!-- <pre>test {{ selectedLodgingData }}</pre> -->
        <div>
            <h1>Edit Lodging</h1>
        </div>
        <div>
            <DataForm v-for="type in typeList" :key="type.id" :data="type" @handleSubmit="handleSubmit"
                @handleToLodging="handleToLodging" :selectedLodgingData="selectedLodgingData[0]"/>
        </div>
    </section>
</template>