<script setup lang="ts">
import { ref } from 'vue'
import UiCard from '../UiCard.vue'
import EditPost from './EditPost.vue'
import PostContent from './PostContent.vue'

const { post } = defineProps(['post'])
const editViewOpened = ref(false)
const setEditViewOpened = () => (editViewOpened.value = !editViewOpened.value)
</script>

<template>
  <li class="w-full mb-4">
    <Transition name="fade" appear>
      <UiCard>
        <EditPost v-if="editViewOpened" :post="post" @closeEditView="setEditViewOpened" />
        <PostContent v-else :post="post" @openEditView="setEditViewOpened" />
      </UiCard>
    </Transition>
  </li>
</template>

<style scoped>
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
