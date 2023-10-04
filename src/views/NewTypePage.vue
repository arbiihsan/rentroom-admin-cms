<script>
export default {
    name: "NewTypePage",
    emits: ["changePage", "handleAddType"],
    data() {
        return {
            typePage: 'types',
            newType: '',
        }
    },
    methods: {
        handleToType() {
            this.$emit("changePage", this.typePage)
        },
        handleSubmit() {
            this.$emit("handleAddType", this.newType)
        }
    }
}
</script>

<template>
    <section id="new-type-section" >
        <div>
            <h1>New type</h1>
        </div>
        <div>
            <form id="type-form" class="lodging-form" @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="type-name">Name <span>*</span></label>
                    <input v-model="newType" type="text" id="type-name" class="form-input" placeholder="Enter type name" autocomplete="off"
                        required />
                </div>
                <div class="form-button-group">
                    <div>
                        <a id="cancel-submit-type" class="form-cancel-link" @click.prevent="handleToType">Cancel</a>
                    </div>
                    <div>
                        <button type="submit" href="" class="form-submit-button">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>