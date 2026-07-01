<script setup>
import { onMounted, ref } from 'vue'
import api from '../../../axios.js'
import ScheduleCell from './ScheduleCell.vue'

const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
const scheduleRows = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
    try {
        const response = await api.get('/classes')
        const classes = response.data.data

        if (!classes || classes.length === 0) {
            error.value = 'No active classes found.'
            return
        }

        const timeMap = {}
        classes.forEach(c => {
            const timeParts = c.schedule_time.split(':')
            let hour = parseInt(timeParts[0])
            const ampm = hour >= 12 ? 'PM' : 'AM'
            hour = hour % 12 || 12
            const formattedTime = `${hour.toString().padStart(2, '0')}:${timeParts[1]} ${ampm}`

            if (!timeMap[formattedTime]) {
                timeMap[formattedTime] = [null, null, null, null, null, null, null]
            }

            const dayIndex = days.value.indexOf(c.schedule_day)
            if (dayIndex !== -1) {
                timeMap[formattedTime][dayIndex] = {
                    className: c.name,
                    trainer: c.trainer?.name || 'TBA'
                }
            }
        })

        scheduleRows.value = Object.keys(timeMap)
            .sort((a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b))
            .map((time, index) => ({ id: index + 1, time, slots: timeMap[time] }))

    } catch (err) {
        console.error('Failed to load classes:', err)
        error.value = 'Failed to load schedule. Please try again.'
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <section class="py-24 bg-dark-surface">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-16">
                <i class="fa-solid fa-spinner fa-spin text-neon-green text-3xl"></i>
                <p class="text-gray-400 mt-4 uppercase tracking-widest">Loading schedule...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-16">
                <p class="text-red-400">{{ error }}</p>
            </div>

            <!-- Schedule Table -->
            <div v-else class="overflow-x-auto">
                <table class="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                        <tr
                            class="bg-black text-white font-heading text-lg uppercase tracking-wider border-b border-white/20">
                            <th class="p-6 border-r border-white/10 text-neon-green">Time</th>
                            <th v-for="(day, index) in days" :key="index" class="p-6"
                                :class="{ 'border-r border-white/10': index < days.length - 1 }">{{ day }}</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm text-gray-300">
                        <tr v-for="(row, rowIndex) in scheduleRows" :key="row.id"
                            class="hover:bg-white/5 transition-colors"
                            :class="{ 'border-b border-white/10': rowIndex < scheduleRows.length - 1 }">
                            <td class="p-6 border-r border-white/10 font-bold text-white">{{ row.time }}</td>

                            <ScheduleCell v-for="(slot, slotIndex) in row.slots" :key="slotIndex" :entry="slot"
                                :islast="slotIndex === row.slots.length - 1" />
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </section>
</template>

<style scoped></style>