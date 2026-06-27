<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Derive page title from route meta, fallback to route name
const pageTitle = () => route.meta?.title ?? route.name?.replace('admin.', '') ?? 'Admin'

async function logout() {
    await authStore.logout()
    router.push({ name: 'admin.login' })
}
</script>

<template>
    <header class="h-16 bg-black border-b border-white/10 flex items-center justify-between px-6 shrink-0">

        <!-- Page title — driven by route meta.title -->
        <h1 class="text-white font-heading font-bold uppercase tracking-wider text-sm capitalize">
            {{ pageTitle() }}
        </h1>

        <!-- Right: user + logout -->
        <div class="flex items-center gap-4">

            <!-- User badge -->
            <div class="flex items-center gap-2 text-sm text-gray-400">
                <span
                    class="w-7 h-7 bg-neon-green rounded-full flex items-center justify-center text-black font-bold text-xs">
                    A
                </span>
                <span class="hidden sm:inline">Admin</span>
            </div>

            <div class="w-px h-5 bg-white/10" />

            <!-- Logout -->
            <button class="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                @click="logout" aria-label="Logout">
                <i class="fa-solid fa-right-from-bracket" />
                <span class="hidden sm:inline">Logout</span>
            </button>
        </div>

    </header>
</template>

<style scoped></style>