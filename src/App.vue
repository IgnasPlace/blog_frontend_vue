<script setup lang="ts">
import HeaderComponent from './components/layout/HeaderComponent.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { getUser } from './utils/getUser'
import { getPosts } from './utils/getPosts'
import { useUserStore } from './stores/user'
import { usePostsStore } from './stores/posts'
import router from './router'

const userStore = useUserStore()
const postsStore = usePostsStore()

onMounted(async () => {
  try {
    userStore.setLoadingUser(true)
    const userFromAPI = await getUser()
    if (userFromAPI) {
      userStore.setUser(userFromAPI.user)
      router.push({ name: 'allPosts' })
    }
  } catch (err) {
    console.error(err)
    router.push({ name: 'login' })
  } finally {
    userStore.setLoadingUser(false)
  }
  try {
    postsStore.setLoadingPosts(true)
    const postsFromAPI = await getPosts()
    if (postsFromAPI.length) {
      postsStore.setPosts(postsFromAPI)
    }
  } catch (err) {
    console.error(err)
  } finally {
    postsStore.setLoadingPosts(false)
  }
})
</script>

<template>
  <div>
    <HeaderComponent />
    <div class="w-full min-h-screen flex flex-col items-center bg-[#e6e6e6]">
      <div class="h-10"></div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
