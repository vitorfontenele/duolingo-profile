<template>
    <section class="flex items-center sm:items-start justify-center min-h-screen px-4">
        <div class="flex flex-col gap-y-6">
            <h2 class="text-center font-semibold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Quem tem mais XP?</h2>
            <div>
                <div v-for="(user, index) in usersSortedByXP">
                    <h5>{{ `${user.usedName} - ${user.roundedTotalXP}k`}}</h5>
                    <div   
                        :style="`width: ${user.barWidth}%`"
                        class="bg-teal-200 h-8 flex justify-between"
                        :key="index"
                    >
                    </div>               
                </div>
            </div>
            <div class="text-center" v-if="!isEqual">
                <p class="text-xl mb-4 lg:text-2xl xl:text-3xl"><span class="font-semibold">{{ usersSortedByXP[0]?.usedName }}</span> possui mais XP.</p>
                <p class="font-light"><span>{{ usersSortedByXP[1]?.usedName }}</span> tem {{ usersSortedByXP[1]?.barWidth }}% do total de XP de <span class="font-bold">{{ usersSortedByXP[0]?.usedName }}</span>.</p>
                <p class="font-light">A diferença de XP entre os dois é de {{ roundToOne((usersSortedByXP[0]?.totalXp - usersSortedByXP[1]?.totalXp)/1000) }}k pontos de XP.</p>
            </div>
            <div class="text center" v-else>
                <p class="text-xl mb-4 lg:text-2xl xl:text-3xl">Os dois usuários possuem o mesmo total de XP.</p>
                <p>Portanto, a diferença de XP entre os dois é zero.</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "XPBarChartSection",
        data(){
            return {
                isEqual: true,
            }
        },
        props: [
            "usersData"
        ],
        methods: {
            roundToOne(num){
                return num.toFixed(1);
            }
        },
        computed: {
            usersSortedByXP(){
                if (this.usersData.length > 0){
                    const sortedUsersData = JSON.parse(JSON.stringify(this.usersData));
                    sortedUsersData.sort((a, b) => {
                        const difference = b.totalXp - a.totalXp;
                        if (difference != 0){this.isEqual = false}
                        return difference;
                    })
                    const maxXP = sortedUsersData[0].totalXp;
                    sortedUsersData.map(user => {
                        user["barWidth"] = user.totalXp == 0 ? 1 : Math.round(100*(user.totalXp/maxXP));
                        user["usedName"] = user.name ? user.name : user.username;
                        user["roundedTotalXP"] = this.roundToOne(user.totalXp/1000);
                    })
                    console.log(this.usersData);
                    return sortedUsersData;
                } else {
                    return [];
                }  
            }
        }
    }
</script>