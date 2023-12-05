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
    <UiCard>
      <EditPost
        v-if="editViewOpened"
        :post="post"
        @closeEditView="setEditViewOpened"
        title="Delete"
      />
      <PostContent
        v-else
        :post="post"
        @openEditView="setEditViewOpened"
      />
    </UiCard>
  </li>
</template>
