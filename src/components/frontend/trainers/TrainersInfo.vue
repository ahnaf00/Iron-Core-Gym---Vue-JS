<script setup>
import { onMounted, ref } from 'vue'
import TrainerCard from '../../ui/TrainerCard.vue';
import api from '../../../axios.js';

const trainers = ref([])
const isLoading = ref(true)

const skills = ref([
  { id: 1, label: 'Cardio & Endurance', percentage: 90 },
  { id: 2, label: 'Strength & Conditioning', percentage: 95 },
  { id: 3, label: 'Yoga & Flexibility', percentage: 85 },
])

onMounted(async () => {
  try {
    const response = await api.get('/trainers');
    trainers.value = response.data.data.map(t => ({
      id: t.id,
      name: t.name,
      role: t.speciality,
      image: t.photo_url || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop',
      socilas: [
        { id: 1, icon: 'fa-brands fa-facebook-f', href: '#' },
        { id: 2, icon: 'fa-brands fa-instagram', href: '#' },
        { id: 3, icon: 'fa-brands fa-twitter', href: '#' },
      ]
    }));
  } catch (err) {
    console.error("failed to load trainers: ", err);
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="py-24 bg-dark-surface">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">

        <TrainerCard v-for="trainer in trainers" :key="trainer.id" :trainer="trainer" variant="page"></TrainerCard>

      </div>

      <!-- Skills Section -->
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="text-neon-green font-bold tracking-[0.2em] uppercase">Stats</span>
          <h2 class="text-3xl font-heading font-bold text-white mt-2 uppercase">Our <span
              class="text-neon-green">Expertise</span></h2>
        </div>

        <div class="space-y-8">
          <!-- Skill 1 -->
          <div v-for="skill in skills" :key="skill.id">
            <div class="flex justify-between items-end mb-2">
              <span class="text-white font-heading font-bold uppercase tracking-wider">{{ skill.label }}</span>
              <span class="text-neon-green font-bold">{{ skill.percentage }}%</span>
            </div>
            <div class="w-full bg-white/10 h-3">
              <div class="bg-neon-green h-full transition-all duration-700" :style="{ width: `${skill.percentage}%` }">
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped></style>