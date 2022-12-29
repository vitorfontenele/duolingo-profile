<template>
    <section class="flex items-center sm:items-start justify-center min-h-screen px-4">
        <div class="flex flex-col gap-y-6">
            <h2 class="text-center font-semibold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Quem está na ofensiva mais longa?</h2>
            <div>
                <div v-for="(user, index) in usersSortedByStreak">
                    <h5>{{ `${user.usedName} - ${user.streak} dias`}}</h5>
                    <div   
                        :style="`width: ${user.barWidth}%`"
                        class="bg-orange-200 h-8 flex justify-between"
                        :key="index"
                    >
                    </div>               
                </div>
            </div>
            <div class="text-center" v-if="!isEqual">
                <p class="text-xl mb-4 lg:text-2xl xl:text-3xl"><span class="font-semibold">{{ usersSortedByStreak[0]?.usedName }}</span> está na ofensiva mais longa.</p>
                <p class="font-light">A diferença de dias entre a ofensiva atual dos dois é de {{ usersSortedByStreak[0]?.streak - usersSortedByStreak[1]?.streak }} dias.</p>
            </div>
            <div class="text-center" v-else>
                <p class="text-xl mb-4 lg:text-2xl xl:text-3xl">A ofensiva atual dos dois possui o mesmo número de dias.</p>
                <p class="font-light">Portanto, a diferença de dias entre a ofensiva atual de ambos é zero.</p>
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
        methods: {

        },
        computed: {
            usersSortedByStreak(){
                if (this.usersData.length > 0){
                    const sortedUsersData = JSON.parse(JSON.stringify(this.usersData));
                    this.isEqual = true;
                    sortedUsersData.sort((a, b) => {
                        const difference = b.streak - a.streak;
                        if (difference != 0){this.isEqual = false}
                        return difference;
                    })
                    const maxStreak = sortedUsersData[0].streak;
                    sortedUsersData.map(user => {
                        user["barWidth"] = user.streak == 0 ? 1 : Math.round(100*(user.streak/maxStreak));
                        user["barWidth"] = user["barWidth"] > 1 ? user["barWidth"] : 1;
                        user["usedName"] = user.name ? user.name : user.username;
                    })
                    return sortedUsersData;
                } else {
                    return [];
                }  
            }
        }
    }
</script>