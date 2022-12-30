<template>
    <div 
        class="px-2 py-1 text-slate-50 fixed bottom-1 bg-red-400 rounded flex items-center gap-x-2 left-1/2 -translate-x-1/2 sm:bottom-6 lg:bottom-12 lg:text-xl"
    >
        <p class="text-center">Erro ao carregar um ou ambos usuários</p>
        <div class="cursor-pointer" @click="$emit('closeModal')">X</div>
    </div>
</template>

<script>
    export default {
        name: "ErrorModal",
        emits: ["closeModal"]
    }
</script>