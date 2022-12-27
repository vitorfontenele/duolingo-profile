<template>
    <section class="min-h-screen">
        <h2 class="text-center font-semibold mb-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Informações básicas</h2>
        <div class="flex flex-col gap-y-4 gap-x-4 sm:flex-row sm:justify-center">
            <article class="flex flex-col items-center bg-teal-50 shadow gap-y-9 py-8 sm:rounded sm:w-80" v-for="user in usersData">
                <div>
                    <img :src="`https://${user.picture}/xxlarge`" alt="User photo" height="150" width="150" class="rounded-full">
                </div>
                <div class="flex flex-col items-center">
                    <h3 class="font-semibold text-2xl text-center">{{ user.name ? user.name : user.username }}</h3>
                    <h4 class="font-semibold text-gray-700 text-sm text-center">{{ user.username }}</h4>
                    <div class="w-fit mt-1">
                        <img class="max-w-[40px]" :src="`https://flaglog.com/codes/standardized-rectangle-120px/${user.profileCountry}.png`" alt="User country of origin">
                    </div>
                    <a class="rounded shadow uppercase bg-teal-100 hover:bg-teal-200 px-5 py-1 mt-2" :href="`https://www.duolingo.com/profile/${user.username}`" target="_blank">Perfil</a>
                </div>
                <div class="w-full flex justify-around">
                    <div>
                        <h4 class="font-semibold text-center">{{ user.streak }}</h4>
                        <h5 class="font-light">Dias seguidos</h5>
                    </div>
                    <div>
                        <h4 class="font-semibold text-center">{{ user.totalXp }}</h4>
                        <h5 class="font-light">Total XP</h5>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PersonalInfoSection",
        props: [
            "usersData",
            "title"
        ]
    }
</script>