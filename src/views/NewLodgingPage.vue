<script>
import DataForm from "@/components/DataForm.vue";

export default {
  name: "NewLodgingPage",
  components: {
    DataForm
  },
  emits: ["changePage", "handleAddLodging", "handleFetchTypes"],
  props: ["typeList"],
  methods: {
    handleToLodging() {
      this.$emit("changePage", "lodgings");
    },
    handleSubmit(formData) {
      this.$emit("handleAddLodging", formData);
    }
  },
  created() {
    this.$emit("handleFetchTypes")
  }
};
</script>

<template>
    <section id="new-lodging-section" class="new-lodging-section">
      <div>
        <h1>New Lodging</h1>
      </div>
      <div>
        <DataForm v-for="type in typeList" :key="type.id" :data="type" @handleSubmit="handleSubmit" @handleToLodging="handleToLodging" />
      </div>
    </section>
  </template>