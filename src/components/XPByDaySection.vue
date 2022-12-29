<template>
    <section class="flex items-center sm:items-start justify-center min-h-screen px-4">
        <div class="flex flex-col gap-y-6">
            <h2 class="text-center font-semibold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Quem ganha mais XP por dia?</h2>
            <div class="flex flex-col gap-y-4 gap-x-4 sm:flex-row sm:justify-center">
                <div v-for="(user, index) in usersSortedByXPPerDay">
                    <div class="bg-teal-200 flex flex-col justify-center items-center px-6 py-8">
                        <p class="font-semibold text-center text-xl lg:text-2xl">{{ user.XPPerDay }} XP</p>
                        <p>por dia</p>
                    </div>
                    <p class="text-center">{{ user.usedName }}</p>
                </div>
            </div>
            <div class="text-center" v-if="!isEqual">
                <p class="text-xl mb-4 lg:text-2xl xl:text-3xl"><span class="font-semibold">{{ usersSortedByXPPerDay[0]?.usedName }}</span> tem uma taxa maior de XP ganho por dia.</p>
                <p class="font-light">O cálculo é feito dividindo-se o total de XP de cada usuário pelo número de dias entre hoje e o dia da criação da conta do usuário no Duolingo.</p>
            </div>
            <div class="text-center" v-else>
                <p class="text-xl mb-4 lg:text-2xl xl:text-3xl">Ambos possuem a mesma taxa de XP ganho por dia.</p>
                <p class="font-light">O cálculo é feito dividindo-se o total de XP de cada usuário pelo número de dias entre hoje e o dia da criação da conta do usuário no Duolingo.</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "StreakSection",
        data(){
            return {
                isEqual: true
            }
        },
        props: [
            "usersData"
        ],
        computed: {
            usersSortedByXPPerDay(){
                if (this.usersData.length > 0){
                    const sortedUsersData = JSON.parse(JSON.stringify(this.usersData));
                    sortedUsersData.map(user => {
                        user["usedName"] = user.name ? user.name : user.username;
                        const userDate = new Date(1000 * user.creationDate);
                        const diffDates = Date.now() - userDate.getTime();
                        const diffDaysRaw = diffDates/(1000*60*60*24);
                        const diffDays = Math.floor(diffDaysRaw) + 1;
                        const XPPerDay = (user.totalXp/diffDays).toFixed(2);
                        user["XPPerDay"] = Number(XPPerDay);
                    })
                    this.isEqual = true;
                    sortedUsersData.sort((a, b) => {
                        const difference = b.XPPerDay - a.XPPerDay;
                        if (difference != 0){this.isEqual = false}
                        //console.log("isEqual", this.isEqual, "difference", difference);
                        return difference;
                    })
                    return sortedUsersData;
                } else {
                    return [];
                }  
            }
        }
    }
</script>