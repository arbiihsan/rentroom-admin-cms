<script>
import ButtonRoutes from "../components/ButtonRoutes.vue"

export default {
    name: "RegisterPage",
    emits: ["changePage", "handleRegister"],
    data() {
        return {
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            address: "",
            loginPage: 'login',
            buttonName: "Login"
        }
    },
    components: { ButtonRoutes },
    methods: {
        changePage(page) {
            this.$emit("changePage", page)
        },
        register() {
            // console.log(this.username, this.email, this.password, this.phoneNumber, this.address);
            this.$emit("handleRegister", this.username, this.email, this.password, this.phoneNumber, this.address)
        }
    }
}
</script>

<template>
    <section id="register-section">
        <div class="header">
            <h2>Register</h2>
        </div>
        <form @submit.prevent="register" class="loginRegister">
            <label for="username">Username:</label><br>
            <input v-model="username" type="text" name="username" placeholder="Username" class="inputLoginRegister"
                required>

            <label for="email">Email:</label><br>
            <input v-model="email" type="text" name="email" placeholder="Email Address" class="inputLoginRegister" required>

            <label for="password">Password:</label><br>
            <input v-model="password" type="password" name="password" placeholder="Password" class="inputLoginRegister"
                required>

            <label for="phoneNumber">Phone Number:</label><br>
            <input v-model="phoneNumber" type="number" name="phoneNumber" placeholder="Phone Number"
                class="inputLoginRegister" required>

            <label for="address">Address:</label><br>
            <input v-model="address" type="text" name="address" placeholder="Address" class="inputLoginRegister" required>

            <button type="submit" class="buttonLoginRegister">Register</button>
        </form>
        <div class="register">
            <div class="register_message">Already have an acoount?</div>
            <ButtonRoutes @changePage="changePage" :page="loginPage" :buttonName="buttonName" />
        </div>
    </section>
</template>