<script setup lang="ts">
import { ref } from 'vue'
import DeletePost from './DeletePost.vue'
import UiButton from '../UiButton.vue'
import { useUserStore } from '../../../stores/user'
const userStore = useUserStore()
const user = userStore.getUser
const { post } = defineProps(['post'])
const deleteViewOpen = ref(false)
</script>

<template>
  <div>
    <article class="">
      <h2 class="text-2xl font-bold mb-2">
        {{ post.title.charAt(0).toUpperCase() + post.title.slice(1) }}
      </h2>
      <hr class="border-t-2 border-red-300 opacity-30" />
      <p class="text-xl my-4 whitespace-pre-wrap">
        {{ post.body.charAt(0).toUpperCase() + post.body.slice(1) }}
      </p>
    </article>
    <div>
      <span class="block text-end italic">Author: {{ post.user_name }}</span>
      <span v-if="post.updated_on" class="block text-end text-violet-800"
        >Edited on {{ post.updated_on.substring(0, 10) }}</span
      >
    </div>
    <div v-if="user && user.id === post.user_id" class="flex justify-end">
      <DeletePost
        v-if="deleteViewOpen"
        :post="post"
        @cancel="deleteViewOpen = false"
        question="Are you sure you want to delete the post?"
      />
      <div v-else class="flex gap-4 pt-4">
        <UiButton @click="$emit('openEditView')" title="Edit" type="edit" />
        <UiButton @click="() => (deleteViewOpen = true)" title="Delete" type="delete" />
      </div>
    </div>
  </div>
</template>
