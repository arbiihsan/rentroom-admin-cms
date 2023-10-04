<script>
export default {
    name: "DataForm",
    emits: ["handleToLodging", "handleSubmit"],
    props: ["data", "selectedLodgingData"],
    data() {
        return {
            formData: {
                id: this.selectedLodgingData ? this.selectedLodgingData.id : 0,
                name: this.selectedLodgingData ? this.selectedLodgingData.name : "",
                typeId: this.selectedLodgingData ? this.selectedLodgingData.typeId[0] : "",
                facility: this.selectedLodgingData ? this.selectedLodgingData.facility : "",
                roomCapacity: this.selectedLodgingData ? this.selectedLodgingData.roomCapacity : 0,
                price: this.selectedLodgingData ? this.selectedLodgingData.price : 0,
                imgUrl: this.selectedLodgingData ? this.selectedLodgingData.imgUrl : "",
                location: this.selectedLodgingData ? this.selectedLodgingData.location : ""
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$emit("handleSubmit", this.formData);
        },
        handleCancel() {
            this.$emit("handleToLodging");
        }
    }
};
</script>

<template>
    <!-- <pre>{{ selectedLodgingData }}</pre> -->
    <form @submit.prevent="handleSubmit" class="lodging-form">
        <div class="form-group">
            <label for="lodging-name" class="form-label">Name <span class="required">*</span></label>
            <input v-model="formData.name" type="text" id="lodging-name" class="form-input" placeholder="Enter lodging name"
                autocomplete="off" required />
        </div>
        <div class="form-group">
            <label for="lodging-type" class="form-label">Type <span class="required">*</span></label>
            <select v-model="formData.typeId" id="lodging-type" class="form-select" required>
                <option selected hidden value="">-- Select Type --</option>
                <option v-for="typeData in data" :key="typeData.id" :value="typeData.id"> {{ typeData.name }} </option>
            </select>
        </div>
        <div class="form-group">
            <label for="facility" class="form-label">Facility <span class="required">*</span></label>
            <input v-model="formData.facility" type="text" id="facility" class="form-input"
                placeholder="Enter lodging facility" autocomplete="off" required />
        </div>
        <div>
            <div class="form-group-inner">
                <div class="form-group-half">
                    <label for="room-capacity" class="form-label">Room Capacity <span class="required">*</span></label>
                    <input v-model="formData.roomCapacity" type="number" min="0" id="room-capacity" class="form-input"
                        placeholder="Enter room capacity" autocomplete="off" required />
                </div>
                <div class="form-group-half">
                    <label for="price" class="form-label">Price <span class="required">*</span></label>
                    <input v-model="formData.price" type="number" min="0" id="price" class="form-input"
                        placeholder="Enter lodging price" autocomplete="off" required />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="lodging-image" class="form-label">Image <span class="required">*</span></label>
            <input v-model="formData.imgUrl" type="text" id="lodging-image" class="form-input"
                placeholder="Enter lodging image url" autocomplete="off" required />
        </div>
        <div class="form-group">
            <label for="location" class="form-label">Location <span class="required">*</span></label>
            <input v-model="formData.location" type="text" id="location" class="form-input"
                placeholder="Enter lodging location" autocomplete="off" required />
        </div>
        <div class="form-button-group">
            <a id="cancel-submit" class="form-cancel-link" @click.prevent="handleCancel">Cancel</a>
            <button type="submit" class="form-submit-button">Submit</button>
        </div>
    </form>
</template>