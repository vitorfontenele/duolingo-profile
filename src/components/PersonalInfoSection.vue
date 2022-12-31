<template>
    <section id="personal-info" class="min-h-screen">
        <h2 class="text-center font-semibold mb-8 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Informações básicas</h2>
        <div class="flex flex-col gap-y-8 gap-x-12 xl:gap-x-16 sm:flex-row sm:justify-center px-4">
            <article class="relative flex flex-col items-center bg-neutral-50 shadow-xl gap-y-9 pt-8 sm:w-80" v-for="user in usersData">
                <div class="rounded-t absolute top-0 w-full bg-slate-700 h-[107px]"></div>
                <div class="relative">
                    <img 
                        :src="checkImage(user.picture)" 
                        :alt="`${user.name ? user.name : user.username}`" 
                        height="150" 
                        width="150" 
                        class="shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full"
                    >
                </div>
                <div class="flex flex-col items-center">
                    <h3 class="font-semibold text-2xl text-center">{{ user.name ? user.name : user.username }}</h3>
                    <h4 class="font-semibold text-gray-700 text-sm text-center">{{ user.username }}</h4>
                    <div class="w-fit mt-1">
                        <img 
                            class="max-w-[40px]" 
                            :src="pickFlag(user)" 
                            alt="User country of origin"
                        >
                    </div>
                </div>
                <div class="w-full">
                    <div class="flex">
                        <div class="bg-slate-200 flex-grow py-4 border-t-2 border-r-2 border-slate-300">
                            <div class="flex justify-center items-center gap-x-1">
                                <div>
                                    <img 
                                        src="https://d35aaqx5ub95lt.cloudfront.net/images/398e4298a3b39ce566050e5c041949ef.svg" 
                                        alt="Fire for Duolingo streak"
                                        class="h-5"
                                    >
                                </div>
                                <h4 class="font-semibold text-center">{{ user.streak }}</h4>
                            </div>
                            <h5 class="font-light text-center">Dias seguidos</h5>
                        </div>
                        <div class="bg-slate-200 flex-grow py-4 border-t-2 border-slate-300">
                            <div class="flex justify-center items-center gap-x-1">
                                <div>
                                    <img 
                                        src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/01ce3a817dd01842581c3d18debcbc46.svg" 
                                        alt="Ray for Duolingo Total XP"
                                        class="h-5"
                                    >
                                </div>
                                <h4 class="font-semibold text-center">{{ user.totalXp }}</h4>
                            </div>
                            <h5 class="font-light text-center">Total XP</h5>
                        </div>
                    </div>
                    <a
                        class="bg-green-600 hover:bg-green-700 text-neutral-50 text-lg text-center font-bold uppercase w-full block py-4 rounded-b"
                        :href="`https://www.duolingo.com/profile/${user.username}`" 
                        target="_blank"
                    >Perfil</a>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    export default {
        name: "PersonalInfoSection",
        props: [
            "usersData"
        ],
        methods: {
            pickFlag(user){
                if (user.profileCountry){
                    return `https://flaglog.com/codes/standardized-rectangle-120px/${user.profileCountry}.png`;
                } else {
                    return "unknown-country.png";
                }
            },
            checkImage(link){
                //https://${user.picture}/xxlarge
                if (link){
                    if (link.includes("default")){
                        return "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-19.jpg";
                    } else {
                        return `https://${link}/xxlarge`
                    }
                } else {
                    return "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-19.jpg";
                }
            }
        }
    }
</script>