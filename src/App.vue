<template>
  <div class="bg-green-50">
    <div class="container mx-auto">
      <section class="min-h-screen px-4 flex flex-col justify-center items-center gap-8 sm:flex-row lg:gap-x-16 2xl:gap-x-36" >
        <div class="flex justify-center">
          <img class="w-3/5 h-auto sm:w-full" src="../public/duo-owl.png" alt="Duolingo Owl">
        </div>
        <form class="flex flex-col items-center gap-4 xl:gap-6 lg:w-[52%]" @submit="compare">
          <h1 class="text-center font-semibold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Comparador de usuários do <span class="text-green-400">Duolingo</span></h1>
          <div class="w-full flex flex-col gap-4 xl:items-center">
            <div class="xl:w-2/5" v-for="(username, index) in usernames" :key="index">
              <label :for="`input-${index + 1}`" class="block text-gray-700 text-sm font-bold">{{ `Usuário ${index + 1} (id ou username):` }}</label>
              <input 
                v-model="usernames[index]" 
                :id="`input-${index + 1}`" 
                type="text"
                :placeholder="`JohnDoe${index + 1}`"
                required
                class="w-full text-gray-700 shadow border-2 rounded py-2 px-3 focus:outline-none focus:shadow-outline focus:border-blue-500" 
              />
            </div>     
          </div>
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white mt-4 py-2 px-4 w-fit rounded xl:py-4 xl:px-8" 
            type="submit">Comparar</button>
        </form>
      </section>
      <LoadingModal v-if="showLoadingModal" />
      <ErrorModal v-if="showErrorModal" @close-modal="closeModal" />
      <PersonalInfoSection v-if="showComparison" :usersData="usersData" />
      <XPBarChartSection v-if="showComparison" :usersData="usersData" />
      <StreakSection v-if="showComparison" :usersData="usersData" /> 
      <XPByDaySection v-if="showComparison" :usersData="usersData"/>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import LoadingModal from "./components/LoadingModal.vue";
  import ErrorModal from "./components/ErrorModal.vue";
  import PersonalInfoSection from "./components/PersonalInfoSection.vue";
  import XPBarChartSection from "./components/XPBarChartSection.vue";
  import StreakSection from "./components/StreakSection.vue";
  import XPByDaySection from "./components/XPByDaySection.vue";
  export default {
    name: "App",
    data() {
        return {
            usernames: ["", ""],
            usersData: [],
            showComparison: false,
            showLoadingModal: false,
            showErrorModal: false
        };
    },
    methods: {
        async fetchUserInfo() {
            this.showLoadingModal = true;
            this.showComparison = false;
            this.showErrorModal = false;
            this.usersData = [];
            for (let i = 0; i < this.usernames.length ; i++){
              const username = this.usernames[i];
              if (username == ""){
                this.showComparison = false;
                this.showLoadingModal = false;
                this.showErrorModal = true;
                return;
              }
              const URL = 'https://corsproxy.io/?' + encodeURIComponent(`https://www.duolingo.com/2017-06-30/users?username=${username}`);
              try { 
                const response = await axios.get(URL);
                if (!response.data.users[0]){
                  this.showComparison = false;
                  this.showLoadingModal = false;
                  this.showErrorModal = true;
                  return;
                }
                this.usersData.push(response.data.users[0]);
              } catch (error){
                console.log(error);
              }
            }
            this.showComparison = true;
            this.showLoadingModal = false;
        },
        compare(e) {
            e.preventDefault();
            this.fetchUserInfo();
        },
        closeModal(){
          this.showErrorModal = false;
        }
    },
    components: { 
      LoadingModal, 
      ErrorModal, 
      PersonalInfoSection, 
      XPBarChartSection, 
      StreakSection, 
      XPByDaySection 
    }
}
</script>