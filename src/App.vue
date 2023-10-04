<script>
import LoginPage from "./views/LoginPage.vue"
import Navbar from "./views/Navbar.vue"
import RegisterPage from "./views/RegisterPage.vue"
import Sidebar from "./views/Sidebar.vue"
import DashboardPage from "./views/DashboardPage.vue"
import LodgingPage from "./views/LodgingPage.vue"
import NewLodgingPage from "./views/NewLodgingPage.vue"
import TypePage from "./views/TypePage.vue"
import NewTypePage from "./views/NewTypePage.vue"
import EditLodgingPage from "./views/EditLodgingPage.vue"
import LogsPage from "./views/LogsPage.vue"

import { useToast } from 'vue-toast-notification';

import axios from "axios";

const baseUrl = "https://rentroom-2.arbiihsan.xyz"

export default {
  data() {
    return {
      currentPage: "login",
      username: "",
      lodgingList: [],
      typeList: [],
      logList: [],
      totalLodgings: 0,
      totalTypes: 0,
      selectedLodgingData: [],
    }
  },
  components: { LoginPage, Navbar, RegisterPage, DashboardPage, LodgingPage, Sidebar, NewLodgingPage, TypePage, NewTypePage, EditLodgingPage, LogsPage },
  created() {
    this.$toast = useToast();
    if (localStorage.getItem("access_token")) {
      this.username = localStorage.getItem("username")
      this.currentPage = "dashboard";
    } else {
      this.currentPage = "login";
    }
  },
  computed: {
    showSidebar() {
      if (this.currentPage !== 'login' && this.currentPage !== 'register') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    async handleLogin(email, password) {
      try {
        // console.log('>>>dari app', email, password);
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: {
            email,
            password
          }
        })

        // console.log(data);
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("role", data.role)
        localStorage.setItem("id", data.id)

        this.username = localStorage.getItem("username")
        this.showSuccessMessage(`Welcome ${data.username}`)
        this.currentPage = "dashboard"
      } catch (err) {
        console.log(err);
        this.showErrorMessage(err.response.data.message)
      }
    },
    async handleLogout() {
      localStorage.removeItem("access_token")
      localStorage.removeItem("username")
      localStorage.removeItem("id")
      localStorage.removeItem("role")

      this.showSuccessMessage(`You're Logged Out`)
      this.currentPage = "login"
    },
    async handleRegister(username, email, password, phoneNumber, address) {
      // console.log(username, email, password, phoneNumber, address, "<<<<<<<ini di app");
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/register`,
          data: {
            username,
            email,
            password,
            phoneNumber,
            address,
          }
        })

        this.showSuccessMessage(`Your Account Has Been Created!`)
        this.currentPage = "login"
      } catch (err) {
        console.log(err);
        this.showErrorMessage(err.response.data.message)
      }
    },
    async handleGoogleLogin(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/glogin`,
          headers: {
            google_token: response.credential
          }
        })
        // console.log(data);
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("role", data.role)
        localStorage.setItem("id", data.id)

        this.username = localStorage.getItem("username")
        this.showSuccessMessage(`Welcome ${data.username}`)
        this.currentPage = "dashboard"
      } catch (err) {
        console.log(err);
      }
    },
    async handleFetchLodgings() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/lodgings`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        const filteredData = data.lodgings.map(el => {
          delete el.createdAt,
            delete el.updatedAt
          return {
            id: el.id,
            name: el.name,
            facility: el.facility,
            roomCapacity: el.roomCapacity,
            imgUrl: el.imgUrl,
            authorId: el.User.username,
            location: el.location,
            price: el.price,
            typeId: [el.Type.id, el.Type.name],
            status: el.status
          }
        })
        // console.log(data, filteredData, '<<<<dari app');
        this.totalLodgings = data.lodgings.length
        this.lodgingList = [filteredData]
      } catch (err) {
        console.log(err);
      }
    },
    async handleFetchTypes() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/types`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        const filteredData = data.types.map(el => {
          delete el.createdAt,
            delete el.updatedAt
          return {
            id: el.id,
            name: el.name,
          }
        })

        this.typeList = [filteredData]
        // console.log(this.typeList, '<<<<fetch types');
        this.totalTypes = data.types.length
      } catch (err) {
        console.log(err);
      }
    },
    async handleFetchLogs() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/histories`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        // console.log(data.histories);
        const filteredData = data.histories.map(el => {
          delete el.updatedAt
          return {
            id: el.id,
            name: el.name,
            updatedBy: el.updatedBy,
            description: el.description,
            createdAt: this.formatDate(el.createdAt),
          }
        })

        this.logList = [filteredData]
      } catch (err) {
        console.log(err);
      }
    },
    async handleAddLodging(formData) {
      try {
        // console.log(formData, '<<<<di app');
        const DataForm = {
          name: formData.name,
          typeId: formData.typeId,
          facility: formData.facility,
          roomCapacity: formData.roomCapacity,
          price: formData.price,
          imgUrl: formData.imgUrl,
          location: formData.location
        }

        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/lodgings`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: DataForm,
        })

        this.showSuccessMessage(`Lodging ${formData.name} Has Been Created!`)

        this.currentPage = "lodgings"

      } catch (err) {
        console.log(err);
        this.showErrorMessage(err.response.data.message)

      }
    },
    async handleUpdateStatus(newStatus, lodgingId) {
      // console.log(lodgingId, newStatus, '<<<<dari app');
      try {
        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrl}/lodgings/${lodgingId}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            id: lodgingId,
            status: newStatus
          }
        })

      } catch (err) {
        console.log(err);
      }
    },
    async handleEditLodging(formData) {
      try {
        // console.log(formData, '<<<<di app yang handleedit');
        const DataForm = {
          name: formData.name,
          typeId: formData.typeId,
          facility: formData.facility,
          roomCapacity: formData.roomCapacity,
          price: formData.price,
          imgUrl: formData.imgUrl,
          location: formData.location
        }

        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/lodgings/${formData.id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: DataForm,
        })
        
        this.showSuccessMessage(`Lodging ${formData.name} Has Been Updated!`)
        this.currentPage = "lodgings"
      } catch (err) {
        console.log(err);
        this.showErrorMessage(err.response.data.message)
      }
    },
    async handleAddType(name) {
      try {
        // console.log(name, "<<<di app");
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/types`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {name},
        })

        this.showSuccessMessage(`Type ${name} Has Been Created!`)
        this.currentPage = "types"
      } catch (err) {
        console.log(err);
        this.showErrorMessage(err.response.data.message)
      }
    },
    handlePassingLodgingData(lodgingData) {
      this.selectedLodgingData = [lodgingData]
      // console.log(this.selectedLodgingData, "<<<<dari app handlePassing");
    },
    formatDate(date) {
      const createdDate = date
      return createdDate.split('T')[0]
    },
    showSuccessMessage(message) {
      this.$toast.success(message, {
        position: "top",
        duration: 3000,
        dismissible: true
      })
    },
    showErrorMessage(message) {
      this.$toast.error(message, {
        position: "top",
        duration: 3000,
        dismissible: true
      })
    }
  },
  watch: {
    currentPage(newValue, oldValue) {
      if (newValue === 'dashboard') {
        this.handleFetchLodgings();
        this.handleFetchTypes();
      } 
    },
  },
}

</script>

<template>
  <body>
    <div id="app">
      <Navbar />
      <LoginPage v-if="currentPage === 'login'" @handleLogin="handleLogin" @changePage="changePage" @handleGoogleLogin="handleGoogleLogin"/>
      <RegisterPage v-if="currentPage === 'register'" @handleRegister="handleRegister" @changePage="changePage" />

      <section class="home-container" id="home-section" v-if="currentPage !== 'login' && currentPage !== 'register'">
        <Sidebar v-if="showSidebar" @changePage="changePage"
          @handleLogout="handleLogout" :username="username" />
        <DashboardPage v-if="currentPage === 'dashboard'" :totalLodgings="totalLodgings" :totalTypes="totalTypes" @handleFetchLodgings="handleFetchLodgings" @handleFetchTypes="handleFetchTypes" />
        <LodgingPage v-if="currentPage === 'lodgings'" @changePage="changePage" :lodgingList="lodgingList"
          @handleFetchLodgings="handleFetchLodgings" @handleUpdateStatus="handleUpdateStatus"
          @handlePassingLodgingData="handlePassingLodgingData" />
        <NewLodgingPage v-if="currentPage === 'new-lodging'" @changePage="changePage" :typeList="typeList"
          @handleAddLodging="handleAddLodging" @handleFetchTypes="handleFetchTypes" />
        <EditLodgingPage v-if="currentPage === 'edit-lodging'" @changePage="changePage" :typeList="typeList"
          @handleEditLodging="handleEditLodging" @handleFetchTypes="handleFetchTypes"
          :selectedLodgingData="selectedLodgingData" />
        <TypePage v-if="currentPage === 'types'" :typeList="typeList" @handleFetchTypes="handleFetchTypes" @changePage="changePage"/>
        <LogsPage v-if="currentPage === 'logs'" @handleFetchLogs="handleFetchLogs" :logList="logList" />
        <NewTypePage v-if="currentPage === 'new-type'" @changePage="changePage" @handleAddType="handleAddType"/>
      </section>
    </div>
  </body>
</template>

<style></style>
