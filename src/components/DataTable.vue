<script>
export default {
    name: "DataTable",
    props: ["data"],
    emits: ["handleUpdateStatus", "handleToEditLodgingPage", "handlePassingLodgingData"],
    data() {
        return {
            statusList: ["Active", "Inactive", "Archived"],
            role: localStorage.getItem("role"),
            username: localStorage.getItem("username")
        }
    },
    methods: {
        handleUpdateStatus(newStatus) {
            // console.log(newStatus, this.data.id, '<<<<dari data table');
            this.$emit("handleUpdateStatus", newStatus, this.data.id)
        },
        handleToEditLodgingPage() {
            this.$emit("handleToEditLodgingPage")
            this.$emit("handlePassingLodgingData", this.data)
        },
    }
}
</script>

<template>
    <tbody>
        <!-- <pre>{{ data }}</pre> -->
        <tr>
            <td v-for="(value, col) in data" :key="col">
                <template v-if="col === 'imgUrl'">
                    <img :src="value" alt="image" class="table-image" />
                </template>
                <template v-else-if="col === 'status'">
                    <div class="action-column">
                        <div>
                            <div v-if="(role === 'admin')">
                                <select @change="handleUpdateStatus(data.status)" v-model="data.status" class="form-select">
                                    <option v-for="status in statusList" :key="status" :value="status">
                                        {{ status }}
                                    </option>
                                </select>
                            </div>
                            <div v-else="role === 'staff'">
                                {{ data.status }}
                            </div>
                        </div>

                        <div v-if="(role === 'admin') || (role === 'staff' && data.authorId === username)">
                            <button @click.prevent="handleToEditLodgingPage" class="edit_button"><span
                                    class="icon material-symbols-outlined me-2">edit_square</span></button>
                        </div>
                    </div>
                </template>
                <template v-else-if="col === 'typeId'">
                    <div>{{ data.typeId[1] }}</div>
                </template>
                <template v-else>
                    {{ value }}
                </template>
            </td>
        </tr>
    </tbody>
</template>


  