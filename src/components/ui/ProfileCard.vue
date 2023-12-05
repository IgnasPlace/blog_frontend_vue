<script setup lang="ts">
import UiCard from './UiCard.vue'
import UiLoading from './UiLoading.vue'
import { useUserStore } from '@/stores/user'

const { user } = defineProps(['user'])
const userStore = useUserStore()
</script>

<template>
  <UiCard>
    <UiLoading v-if="userStore.getLoadingUser" />
    <span v-else-if="!user">No user found</span>
    <div v-else class="flex justify-between gap-4">
      <img
        class="h-16 w-16 rounded-full object-cover"
        :src="user.picture"
        alt="User profile picture"
        referrerPolicy="no-referrer"
      />
      <div class="flex flex-col justify-around">
        <h3>{{ user.name }}</h3>
      </div>
    </div>
  </UiCard>
</template>

<style scoped></style>
