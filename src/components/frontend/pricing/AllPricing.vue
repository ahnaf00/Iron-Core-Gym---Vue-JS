<script setup>
import { ref, computed, onMounted } from 'vue'
import PricingCard from './PricingCard.vue'
import api from '../../../axios.js'

const isYearly = ref(false)

const plans = ref([])

onMounted(async () => {
  try{
    const response = await api.get('/pricing')
    plans.value = response.data.data.map(p => ({
      id: p.id,
      name:p.name,
      description: "get started with our premium package",
      monthlyPrice: parseFloat(p.price),
      yearlyPrice: parseFloat(p.price)*12*0.8,
      featured: p.is_popular,
      features: p.features.map((f,i) => ({id:i,label:f,included:true}))
    }));
  }
  catch(error){
    console.error("failed to load pricing: ",error)
  }
})

// Derive each plan's display price from the toggle state
const displayPrices = computed(() =>
  Object.fromEntries(
    plans.value.map((plan) => [
      plan.id, isYearly.value ? plan.yearlyPrice : plan.monthlyPrice,
    ])
  )
)
</script>

<template>
    <section class="py-24 bg-dark-surface">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Toggle Switch -->
            <div class="flex justify-center items-center mb-16 gap-4">
                <span class="text-white font-bold uppercase tracking-wider" id="monthly-label">Monthly</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" id="pricing-toggle">
                    <div
                        class="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neon-green after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-white/20">
                    </div>
                </label>
                <span class="text-gray-500 font-bold uppercase tracking-wider" id="yearly-label">Yearly <span
                        class="text-neon-green text-xs ml-1">(Save 20%)</span></span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

               <PricingCard
                    v-for="plan in plans"
                    :key="plan.id"
                    :plan="plan"
                    :display-price="displayPrices[plan.id]"
                    :is-yearly="isYearly"
               ></PricingCard>

            </div>
        </div>
    </section>
</template>

<style scoped></style>