<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { ref } from 'vue'

const userStore = useUserStore()
// const navOpened = ref(false)
const navClass = ref('closed')

const toggleNav = () => (navClass.value = navClass.value === 'opened' ? 'closed' : 'opened')
const closeNav = () => (navClass.value = 'closed')

const handleLogout = () => {
  closeNav()
  window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, '_self')
  userStore.setUser(null)
}
</script>

<template>
  <header class="w-full fixed flex justify-center items-center z-50 bg-sky-950 text-white">
    <div class="flex flex-1 items-center px-4 justify-between max-w-[800px]">
      <RouterLink class="py-2 tracking-wider" to="/">LOGO.</RouterLink>

      <nav v-if="userStore.isAuthenticated" class="hidden gap-4 items-center sm:flex">
        <RouterLink
          :to="{ name: 'allPosts' }"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
          >All Posts</RouterLink
        >
        <RouterLink
          :to="{ name: 'myPosts' }"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
          >My Posts</RouterLink
        >
        <RouterLink
          :to="{ name: 'createPost' }"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
          >Add New Post</RouterLink
        >
        <button
          @click="handleLogout"
          class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
          active-class=" bg-white text-violet-900"
        >
          Logout
        </button>
      </nav>
      <button
        v-if="userStore.isAuthenticated"
        class="flex flex-col items-center justify-center h-8 cursor-pointer sm:hidden"
        @click="toggleNav"
      >
        <div :class="navClass === 'opened' ? 'menuIcon menuIconCross' : 'menuIcon'"></div>
      </button>
    </div>
    <div
      v-if="navClass === 'opened'"
      @click="closeNav"
      class="absolute w-full h-[100vh] top-0 "
    ></div>
    <nav
      v-if="userStore.isAuthenticated"
      :class="`flex flex-col gap-2 p-8 bg-sky-950 absolute top-full sm:hidden duration-300 ${navClass}`"
    >
      <RouterLink
        @click="closeNav"
        :to="{ name: 'allPosts' }"
        class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
        active-class=" bg-white text-violet-900"
        >All Posts</RouterLink
      >
      <RouterLink
        @click="closeNav"
        :to="{ name: 'myPosts' }"
        class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
        active-class=" bg-white text-violet-900"
        >My Posts</RouterLink
      >
      <RouterLink
        @click="closeNav"
        :to="{ name: 'createPost' }"
        class="px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
        active-class=" bg-white text-violet-900"
        >Add New Post</RouterLink
      >
      <button
        @click="handleLogout"
        class="text-start px-2 rounded-md hover:bg-white hover:text-violet-900 duration-200"
        active-class=" bg-white text-violet-900"
      >
        Logout
      </button>
    </nav>
  </header>
</template>

<style scoped>
.opened {
  right: 0;
}
.closed {
  right: -100%;
}
.menuIcon::before,
.menuIcon::after {
  content: '';
  position: absolute;
  width: 1.5rem;
  height: 2px;
  border-radius: 2px;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
}
.menuIcon {
  width: 1.5rem;
  height: 2px;
  border-radius: 2px;
  position: relative;
  transition: background-color 0.5s ease;
}
.menuIcon::before {
  opacity: 1;
  transform: translateY(-0.3rem);
  background-color: white;
}
.menuIcon::after {
  opacity: 1;
  transform: translateY(0.3rem);
  background-color: white;
}
.menuIconCross::before {
  transform: translateY(0) rotate(45deg);
}
.menuIconCross::after {
  transform: translateY(0) rotate(-45deg);
}
.menuBtn:hover .menuIconCross {
  background-color: transparent;
}
</style>
