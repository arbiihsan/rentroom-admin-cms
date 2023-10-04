<script>
export default {
    name: "Sidebar",
    emits: ["changePage", "handleLogout"],
    props: ["username"],
    data() {
        return {
            dashboardPage: 'dashboard',
            lodgingPage: 'lodgings',
            typePage: 'types',
            logsPage: 'logs'
        }
    },
    methods: {
        handleToDashboard() {
            this.$emit("changePage", this.dashboardPage)
        },
        handleToLodging() {
            this.$emit("changePage", this.lodgingPage)
        },
        handleToType() {
            this.$emit("changePage", this.typePage)
        },
        handleToLogs() {
            this.$emit("changePage", this.logsPage)
        },
        logout() {
            this.$emit("handleLogout")
        }
    }
}
</script>

<template>
    <nav id="sidebar-menu">
        <div>
            <ul class="navigation">
                <li>
                    <a href="" id="nav-dashboard" @click.prevent="handleToDashboard">
                        <span class="icon material-symbols-outlined me-2">scoreboard</span>Dashboard</a>
                </li>
                <li>
                    <a class="nav-link" href="" id="nav-lodging" @click.prevent="handleToLodging">
                        <span class="icon material-symbols-outlined me-2">home_work</span>Lodgings</a>
                </li>
                <li>
                    <a href="" id="nav-type" @click.prevent="handleToType">
                        <span class="icon material-symbols-outlined me-2">draw_collage</span>Types</a>
                </li>
                <li>
                    <a href="" id="nav-type" @click.prevent="handleToLogs">
                        <span class="icon material-symbols-outlined me-2">history</span>Logs</a>
                </li>
            </ul>
            <h4>
                <span>Account</span>
            </h4>
            <ul class="navigation">
                <li>
                    <a>
                        <span class="icon material-symbols-outlined me-2">person_raised_hand</span> {{ username }}</a>
                </li>
                <li>
                    <a href="" id="nav-logout" @click.prevent="logout">
                        <span class="icon material-symbols-outlined me-2">logout</span>Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style></style>