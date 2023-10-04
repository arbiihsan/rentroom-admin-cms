<script>
    import { GoogleLogin } from 'vue3-google-login'
    import ButtonRoutes from "../components/ButtonRoutes.vue"

    export default {
        name: "LoginPage",
        emits: ["handleLogin", "changePage", "handleGoogleLogin"],
        data() {
            return {
                email: "",
                password: "",
                registerPage: "register",
                buttonName: "Register"
            }
        },
        components: { GoogleLogin, ButtonRoutes },
        methods: {
            handleSubmit() {
                // console.log(this.email, this.password);
                this.$emit("handleLogin", this.email, this.password)
            },
            handleGoogleLogin(response) {
                this.$emit("handleGoogleLogin", response)
            },
            changePage(page) {
                this.$emit("changePage", page)
            }
        }
    }
</script>

<template>
    <section id="login-section">
        <div class="header">
            <h2>Login</h2>
        </div>
        <form id="login-form" class="loginRegister" @submit.prevent="handleSubmit">
            <input v-model="email" type="text" name="email" placeholder="Email Address" id="login-email" class="inputLoginRegister"
                required>

            <input v-model="password" type="password" name="password" placeholder="Password" id="login-password" class="inputLoginRegister"
                required>

            <button type="submit" class="buttonLoginRegister">Login</button>
            <span class="signin_message">Or Sign In With</span>
            <div id="buttonDiv" class="google_button">
                <GoogleLogin :callback="handleGoogleLogin" />
            </div>
        </form>
        <div class="register">
            <div class="register_message">Don't have an acoount?</div>
            <ButtonRoutes  @changePage="changePage" :page="registerPage" :buttonName="buttonName"/>
        </div>
    </section>
</template>

<style></style>