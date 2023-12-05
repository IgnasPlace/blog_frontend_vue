<script setup lang="ts">
import PostItem from './PostItem.vue'
const { posts } = defineProps(['posts'])
</script>
<template>
  <ul class="w-full flex flex-col mt-4">

      <PostItem v-for="post in posts" :post="post" :key="post.id" />

  </ul>
</template>
