<script setup lang="ts">
import UiCard from '../components/ui/UiCard.vue'
import { useUserStore } from '@/stores/user'
import GoogleIcon from '../components/icons/GoogleIcon.vue'
import GithubIcon from '../components/icons/GithubIcon.vue'
const handleGoogleLogin = () => {
  window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self')
}
const handleGithubLogin = () => {
  window.open(`${import.meta.env.VITE_API_URL}/auth/github`, '_self')
}
const userStore = useUserStore()
</script>

<template>
  <div v-if="userStore.getLoadingUser" class="h-screen w-screen flex items-center justify-center">
    <div class="w-[70vw] h-2 rounded-md border-2 border-gray-400 relative overflow-hidden">
      <div class="fillthediv"></div>
    </div>
  </div>
  <div
    v-else
    class="min-h-screen w-full max-w-[800px] p-4 flex flex-col items-center justify-center"
  >
    <Transition name="fade" appear>
      <UiCard>
        <div class="flex flex-col justify-center items-center gap-4">
          <h1 class="text-2xl mb-8 text-slate-700">Login with</h1>
          <button
            class="flex items-center justify-center gap-6 w-[80vw] max-w-xs p-4 text-xl cursor-pointer text-white bg-[#488af4] hover:bg-white hover:text-[#488af4] border-2 border-transparent hover:border-[#488af4] rounded-md duration-200"
            @click="handleGoogleLogin"
          >
            <!-- <v-icon name="io-logo-google" scale="1.5" /> -->
            <GoogleIcon />
            Google
          </button>
          <button
            class="flex items-center justify-center gap-6 w-[80vw] max-w-xs p-4 text-xl cursor-pointer text-white bg-[#3a3a3a] hover:bg-white hover:text-[#3a3a3a] border-2 border-transparent hover:border-[#3a3a3a] rounded-md duration-200"
            @click="handleGithubLogin"
          >
            <GithubIcon />

            GitHub
          </button>
        </div>
      </UiCard>
    </Transition>
  </div>
</template>

<style scoped>
.fillthediv {
  width: 100%;
  height: 100%;
  background-color: #488af4;
  position: absolute;
  transform: translateX(-100%);
  animation: load 1s infinite;
}
@keyframes load {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
