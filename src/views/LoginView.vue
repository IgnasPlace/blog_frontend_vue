<script setup lang="ts">
import UiCard from '../components/ui/UiCard.vue'
const handleGoogleLogin = () => {
  window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self')
}
const handleGithubLogin = () => {
  window.open(`${import.meta.env.VITE_API_URL}/auth/github`, '_self')
}
</script>

<template>
  <div class="min-h-screen w-full max-w-[800px] p-4 flex flex-col items-center justify-center">
    <UiCard>
      <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-2xl mb-8 text-slate-700">Login with</h1>
        <button
          class="w-[80vw] max-w-xs p-4 text-xl cursor-pointer text-white bg-[#488af4] hover:bg-white hover:text-[#488af4] border-2 border-transparent hover:border-[#488af4] rounded-md duration-200"
          @click="handleGoogleLogin"
        >
          <v-icon name="io-logo-google" scale="1.5" />

          Google
        </button>
        <button
          class="w-[80vw] max-w-xs p-4 text-xl cursor-pointer text-white bg-[#3a3a3a] hover:bg-white hover:text-[#3a3a3a] border-2 border-transparent hover:border-[#3a3a3a] rounded-md duration-200"
          @click="handleGithubLogin"
        >
          <v-icon name="bi-github" scale="1.5" />
          GitHub
        </button>
      </div>
    </UiCard>
  </div>
</template>

<style scoped></style>
