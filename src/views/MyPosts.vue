<script setup lang="ts">
import UiLoading from '../components/ui/UiLoading.vue'
import { useUserStore } from '@/stores/user'
import { usePostsStore } from '@/stores/posts'
import ProfileCard from '../components/ui/ProfileCard.vue'
import PostsList from '../components/ui/Post/PostsList.vue'
import { computed } from 'vue'
const userStore = useUserStore()
const postsStore = usePostsStore()
const user = computed(() => userStore.getUser)
const posts = computed(() =>
  postsStore.getPosts.filter((post) => post.user_id === userStore.getUser?.id)
)
</script>

<template>
  <main class="min-h-screen w-full max-w-[800px] p-4 flex flex-1 flex-col items-center py-4">
    <div
      class="w-full flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-end"
    >
      <div class="flex items-center gap-4 ml-4 border-b-2 border-b-rose-600 py-2">
        <h2 class="text-2xl">Posts</h2>
        <span class="bg-white rounded-2xl px-3 text-md font-light">{{ posts.length }}</span>
      </div>
      <ProfileCard :user="user" />
    </div>
    <h3 v-if="posts.length === 0">No posts found..</h3>
    <PostsList v-else :posts="posts" />
  </main>
</template>

<!-- <div v-if="userStore.getLoadingUser"><UiLoading /></div> -->
