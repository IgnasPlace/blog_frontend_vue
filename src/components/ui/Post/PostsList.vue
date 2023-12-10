<script setup lang="ts">
import PostItem from './PostItem.vue'
const { posts } = defineProps(['posts'])
</script>
<template>
  <TransitionGroup appear tag="ul" name="list" class="w-full flex flex-col mt-4">
    <PostItem v-for="post in posts" :post="post" :key="post.id" />
  </TransitionGroup>
</template>

<style scoped>
.list-enter-from {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
}
.list-move {
  transition: all 0.3s ease;
}
</style>
