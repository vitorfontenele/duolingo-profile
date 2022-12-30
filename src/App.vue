<template>
  <div class="bg-green-50">
    <div class="container mx-auto">
      <section class="min-h-screen px-4 flex flex-col justify-center items-center gap-8 sm:flex-row lg:gap-x-16">
        <div class="flex justify-center">
          <img class="w-3/5 h-auto sm:w-full" src="duo-owl.png" alt="Duolingo Owl">
        </div>
        <div class="flex flex-col items-center gap-4 xl:gap-6">
          <h1 class="text-center font-semibold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Comparador de usuários do <span class="text-green-400">Duolingo</span></h1>
          <div class="w-full flex flex-col gap-4 xl:items-center">
            <div class="xl:w-2/5" v-for="(username, index) in usernames" :key="index">
              <label :for="`input-${index + 1}`" class="block text-gray-700 text-sm font-bold">{{ `Usuário ${index + 1} (id ou username):` }}</label>
              <input 
                v-model="usernames[index]" 
                :id="`input-${index + 1}`" 
                type="text"
                placeholder="JohnDoe"
                class="w-full text-gray-700 shadow border-2 rounded py-2 px-3 focus:outline-none focus:shadow-outline focus:border-blue-500"
              >
            </div>     
          </div>
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white mt-4 py-2 px-4 w-fit rounded xl:py-4 xl:px-8" 
            @click="compare">Comparar</button>
        </div>
      </section>
      <div 
        v-if="showLoadingModal" 
        class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
        style="background: rgba(0, 0, 0, 0.3);"
      >
        <div class="bg-slate-50 py-5 px-5 rounded">
          <div role="status" class="flex justify-center">
              <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
          <p>Carregando...</p>
        </div>
      </div>
      <div 
        v-if="showErrorModal"
        class="px-2 py-1 text-slate-50 fixed bottom-1 bg-red-400 rounded flex items-center gap-x-2 left-1/2 -translate-x-1/2 sm:bottom-6 lg:bottom-12"
      >
        <p class="text-center">Erro ao carregar um ou ambos usuários</p>
        <div class="cursor-pointer" @click="closeModal">X</div>
      </div>
      <div v-if="showComparison">
        <PersonalInfoSection :usersData="usersData" />
        <XPBarChartSection :usersData="usersData" />
        <StreakSection :usersData="usersData" /> 
        <XPByDaySection :usersData="usersData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
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
              const URL = `https://www.duolingo.com/2017-06-30/users?username=${username}`;
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
            //console.log("Comparar");
            this.fetchUserInfo();
        },
        closeModal(){
          this.showErrorModal = false;
        }
    },
    components: { PersonalInfoSection, XPBarChartSection, StreakSection, XPByDaySection }
}
</script>