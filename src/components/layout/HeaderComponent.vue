<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()

const handleLogout = () => {
  // userStore.setUser(null)
  window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, '_self')
}
</script>

<template>
  <header class="w-full fixed flex justify-center items-center z-50 bg-sky-950 text-white">
    <div class="flex flex-1 items-center px-4 justify-between max-w-[800px]">
      <RouterLink class="py-2 tracking-wider" to="/">LOGO.</RouterLink>
      <nav class="flex gap-4 items-center">
        <RouterLink
          v-if="userStore.isAuthenticated"
          :to="{ name: 'allPosts' }"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
          >All Posts</RouterLink
        >
        <RouterLink
          v-if="userStore.isAuthenticated"
          :to="{ name: 'myPosts' }"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
          >My Posts</RouterLink
        >
        <RouterLink
          v-if="userStore.isAuthenticated"
          :to="{ name: 'createPost' }"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
          >Add New Post</RouterLink
        >
        <button
          v-if="userStore.isAuthenticated"
          @click="handleLogout"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
