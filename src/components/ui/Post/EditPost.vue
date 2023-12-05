<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '../UiButton.vue'
import { type Post } from '@/types'
import { usePostsStore } from '../../../stores/posts'

const { post } = defineProps(['post'])
const emit = defineEmits(['closeEditView'])

const postsStore = usePostsStore()

const updating = ref(false)
const postUpdated = ref('')
const updateFailed = ref('')
const formFailed = ref(false)
const inputTitle = ref(post.title)
const inputBody = ref(post.body)

const updatePostHandler = () => {
  if (inputTitle.value && inputBody.value && post) {
    sendUpdatedPost({
      ...post,
      title: inputTitle.value,
      body: inputBody.value
    })
  } else {
    if (!formFailed.value) {
      formFailed.value = true
      setTimeout(() => (formFailed.value = false), 300)
    }
  }
}

const sendUpdatedPost = async (updatedPost: Post) => {
  updateFailed.value = ''
  updating.value = true

  const dataToUpdate = {
    title: updatedPost.title,
    body: updatedPost.body,
    updated_on: new Date(Date.now()).toISOString()
  }

  await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/${updatedPost.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(dataToUpdate)
  })
    .then((res) => {
      if (res.ok) {
        // UPDATE STORE
        postsStore.updatePost({
          ...updatedPost,
          updated_on: dataToUpdate.updated_on
        })
        postUpdated.value = 'Post updated cuccessfully!'
        setTimeout(() => {
          postUpdated.value = ''
          emit('closeEditView')
        }, 1000)
      } else {
        throw 'Failed to update. Please try again later.'
      }
    })
    .catch((error) => {
      updateFailed.value = error
      console.log(error)
    })
    .finally(() => {
      updating.value = false
    })
}
</script>
<template>
  <h2 v-if="postUpdated" class="text-2xl text-white py-2 text-center bg-green-600 rounded-md">
    {{ postUpdated }}
  </h2>
  <div v-else>
    <h3 class="mb-4 text-2xl font-bold text-violet-700">Edit Post</h3>
    <form @submit.prevent="updatePostHandler" class="flex flex-col">
      <div class="flex flex-col mb-4">
        <label for="title"><span class="text-red-600">* </span>Title:</label>
        <textarea
          v-model.trim="inputTitle"
          class="p-2 text-xl rounded-md border-none shadow-sm resize-none"
          id="title"
        />
        <span v-if="!inputTitle" class="text-red-600">Please add the title</span>
      </div>
      <div class="flex flex-col mb-4">
        <label for="content"><span class="text-red-600">* </span>Content:</label>
        <textarea
          v-model.trim="inputBody"
          class="min-h-[6rem] p-2 text-xl rounded-md border-none shadow-sm resize-none"
          id="content"
        />
        <span v-if="!inputBody" class="text-red-600"> Please add the content </span>
      </div>
      <h2 v-if="updating">Updating...</h2>
      <div v-else class="flex gap-4">
        <UiButton title="Cancel" type="cancel" @click="$emit('closeEditView')" />
        <UiButton title="Save" type="save" />
      </div>
      <h4 v-if="updateFailed">{{ updateFailed }}</h4>
    </form>
  </div>
</template>
