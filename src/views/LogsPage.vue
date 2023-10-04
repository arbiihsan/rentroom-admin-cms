<script>
import DataTable from '../components/DataTable.vue'

export default {
    name: "LogsPage",
    emits: ["handleFetchLogs"],
    props: ["logList"],
    components: { DataTable },
    data() {
        return {
            logsColumns: [
                "#",
                "Lodging Name",
                "Updated By",
                "Description",
                "Created At",
            ]
        }
    },
    created() {
        this.$emit("handleFetchLogs")
    }

}
</script>

<template>
    <section id="type-section" class="lodging-section">
        <div class="section-header">
            <h1>Logs</h1>
        </div>
        <div class="table-container">
            <table class="lodging-table">
                <thead>
                    <tr>
                        <th v-for="col in logsColumns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <DataTable v-for="log in logList[0]" :key="log.id" :data="log" />
            </table>
        </div>
    </section>
</template>