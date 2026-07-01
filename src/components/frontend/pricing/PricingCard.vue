<script setup>
const props = defineProps({
    plan: {
        type: Object,
        required: true
    },
    displayPrice: {
        type: Number,
        required: true
    },
    isYearly: {
        type: Boolean,
        required: false
    }
})
</script>

<template>
    <div v-if="plan.featured"
        class="border-2 border-neon-green bg-white/5 p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
        <div class="absolute top-0 right-0 bg-neon-green text-black text-xs font-bold uppercase px-4 py-1">
            Recommended</div>
        <h3 class="text-xl font-heading font-bold text-white uppercase mb-4">{{ plan.name }}</h3>
        <p class="text-gray-400 text-sm mb-6">{{ plan.description }}</p>
        <div class="mb-8">
            <span class="text-5xl font-bold text-neon-green price-amount" data-monthly="49" data-yearly="469">${{
                displayPrice }}</span>
            <span class="text-gray-500 price-period">/ {{ isYearly ? 'Yearly' : 'Month' }}</span>
        </div>
        <ul class="space-y-4 mb-8 flex-grow text-gray-300 text-sm">
            <li v-for="feature in plan.features" :key="feature.id" class="flex items-center gap-3"
                :class="{ 'opacity-50': !feature.included }">
                <i :class="feature.included ? 'fa-solid fa-check text-neon-green' : 'fa-solid fa-xmark'"></i>{{ feature.label }}
            </li>

        </ul>
        <a href="#"
            class="block text-center py-4 bg-neon-green text-black font-heading font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 clip-path-slant">
            Choose Plan
        </a>
    </div>

    <div
        v-else
        class="border border-white/10 bg-black p-8 flex flex-col group hover:border-white/30 transition-all duration-300">
        <h3 class="text-xl font-heading font-bold text-white uppercase mb-4">{{ plan.name }}</h3>
        <p class="text-gray-400 text-sm mb-6">{{ plan.description }}</p>
        <div class="mb-8">
            <span class="text-4xl font-bold text-white price-amount" data-monthly="89" data-yearly="859">${{ displayPrice }}</span>
            <span class="text-gray-500 price-period">/ {{ isYearly ? 'Year':'Month'  }}</span>
        </div>
        <ul class="space-y-4 mb-8 flex-grow text-gray-400 text-sm">
            <li 
                v-for="feature in plan.features"
                :key="feature.id"
                class="flex items-center gap-3"
                :class="{ 'opacity-50': !feature.included }"
            >
                <i :class="feature.included ? 'fa-solid fa-check text-neon-green':'fa-solid fa-xmark'"></i>{{ feature.label }}</li>
        </ul>
        <a href="#"
            class="block text-center py-3 border border-white/20 text-white font-heading font-bold uppercase tracking-wider hover:bg-neon-green hover:border-neon-green hover:text-black transition-all duration-300">
            Choose Plan
        </a>
    </div>
</template>

<style scoped></style>