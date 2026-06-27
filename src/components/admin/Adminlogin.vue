<!-- src/components/pages/admin/AdminLogin.vue -->
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const error = ref('')
const isLoading = ref(false)

function handleLogin() {
  error.value = ''
  isLoading.value = true

  try{
    await authStore.login(form.email, form.password)
    router.push({name:'admin.dashboard'})
  }catch(err){
    error.value = err.response?.data?.message || 'Invalid email or password' 
  }finally{
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">

    <!-- Card -->
    <div class="w-full max-w-md bg-dark-surface border border-white/10 p-10">

      <!-- Logo / brand -->
      <div class="text-center mb-10">
        <span class="text-neon-green font-bold tracking-[0.3em] uppercase text-sm">IronCore</span>
        <h1 class="text-3xl font-heading font-bold text-white uppercase mt-1">Admin Panel</h1>
      </div>

      <!-- Error banner -->
      <div
        v-if="error"
        class="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-400 text-sm"
      >
        <i class="fa-solid fa-circle-exclamation mr-2" />
        {{ error }}
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin" novalidate>
        <div>
          <label class="block text-gray-400 text-sm uppercase tracking-wider mb-2" for="username">
            Username
          </label>
          <input
            id="username"
            v-model="form.email"
            type="text"
            placeholder="admin@example.com"
            required
            autocomplete="email"
            class="w-full bg-black border border-white/20 p-4 text-white placeholder-gray-600 focus:border-neon-green focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-gray-400 text-sm uppercase tracking-wider mb-2" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
            class="w-full bg-black border border-white/20 p-4 text-white placeholder-gray-600 focus:border-neon-green focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 bg-neon-green text-black font-heading font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">
            <i class="fa-solid fa-spinner fa-spin mr-2" /> Logging in...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <p class="text-center text-gray-600 text-xs mt-8">
        Demo credentials: <span class="text-gray-400">admin / admin123</span>
      </p>
    </div>

  </div>
</template>

<style scoped></style>