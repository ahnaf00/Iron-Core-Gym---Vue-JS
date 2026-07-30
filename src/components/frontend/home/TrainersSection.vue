<script setup>
import { onMounted, ref } from 'vue'
import TrainerCard from '../../ui/TrainerCard.vue';
import api from '../../../axios.js';

const trainers = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try{  
    const response = await api.get('/trainers')
    trainers.value = response.data.data.slice(0,4).map(t => ({
      id:t.id,
      name:t.name,
      role:t.speciality,
      image:t.photo_url || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop',
      socilas: [
        { id: 1, icon: 'fa-brands fa-facebook-f', href: '#' },
        { id: 2, icon: 'fa-brands fa-instagram', href: '#' },
        { id: 3, icon: 'fa-brands fa-twitter', href: '#' },
      ]
    }))
  }catch(err)
  {
    console.error("Failed to load homepage trainers, ",err)
  }
  finally{
    isLoading.value = false
  }
})
</script>

<template>
    <section id="trainers" class="py-24 bg-black">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <span class="text-neon-green font-bold tracking-[0.2em] uppercase">Expert Team</span>
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-white mt-2 uppercase">Meet The <span
                        class="text-neon-green">Coaches</span></h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Trainer card -->
                <TrainerCard
                    v-for="trainer in trainers"
                    :key="trainer.id"
                    :trainer="trainer"
                />

            </div>
        </div>
    </section>
</template>

<style scoped></style>