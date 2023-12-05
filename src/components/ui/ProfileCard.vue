<script setup lang="ts">
import { defineProps } from 'vue'
import UiCard from './UiCard.vue'

const { user } = defineProps(['user'])
</script>

<template>
  <UiCard>
    <span v-if="!user">No user found</span>
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
