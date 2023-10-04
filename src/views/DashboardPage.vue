<script>
export default {
    name: "DashboardPage",
    props: ["totalLodgings", "totalTypes"],
    emits: ["handleFetchLodgings", "handleFetchTypes"],
    created() {
        this.$emit("handleFetchLodgings")
        this.$emit("handleFetchTypes")
    }
}
</script>

<template>
    <section id="dashboard-section" class="dashboard-section">
        <div class="dashboard-header">
            <h1>Home / Dashboard</h1>
        </div>
        <div class="dashboard-items">
            <div class="dashboard-item">
                <div class="dashboard-title">Total Lodgings</div>
                <div id="total-lodgings" class="dashboard-value">{{ totalLodgings }}</div>
            </div>

            <div class="dashboard-item">
                <div class="dashboard-title">Total Types</div>
                <div id="total-type" class="dashboard-value">{{ totalTypes }}</div>
            </div>
        </div>
    </section>
</template>