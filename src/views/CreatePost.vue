<script setup lang="ts">
import UiButton from '../components/ui/UiButton.vue'
import UiCard from '../components/ui/UiCard.vue'
import { useUserStore } from '@/stores/user'
import { usePostsStore } from '@/stores/posts'
import { ref, type Ref } from 'vue'
import { type NewPost } from '@/types'
import router from '@/router'
const userStore = useUserStore()
const postsStore = usePostsStore()
const user = userStore.getUser

const inputTitle: Ref<string> = ref('')
const inputBody: Ref<string> = ref('')
const createFailed: Ref<string> = ref('')
const postCreated: Ref<string> = ref('')
const formFailed: Ref<boolean> = ref(false)
const creating: Ref<boolean> = ref(false)

const createPostHandler = () => {
  formFailed.value = false
  if (inputTitle.value && inputBody.value && user) {
    sendCreatePost({
      title: inputTitle.value,
      body: inputBody.value,
      createdAt: new Date(Date.now()).toISOString()
    })
  } else {
    if (!formFailed.value) {
      formFailed.value = true
      // setTimeout(() => (formFailed.value = false), 300)
    }
  }
}
const sendCreatePost = async (newPost: NewPost) => {
  if (!user) {
    return
  }
  createFailed.value = ''
  creating.value = true

  await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(newPost)
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw 'Failed to update. Please try again later.'
      }
    })
    .then((data) => {
      postCreated.value = 'Post created cuccessfully!'
      postsStore.addPost({
        ...data,
        user_id: user.id,
        user_name: user.name
      })
      setTimeout(() => {
        postCreated.value = ''
        router.push('/')
      }, 1500)
    })
    .catch((error) => {
      createFailed.value = error
      console.log(error)
    })
    .finally(() => {
      creating.value = false
    })
}
</script>

<style scoped></style>
<template>
  <Transition name="fade" appear>
    <div class="mt-4 w-full max-w-[800px] p-4">
      <h2 v-if="postCreated" class="text-2xl text-white py-8 text-center bg-green-600 rounded-md">
        {{ postCreated }}
      </h2>
      <UiCard v-else>
        <h3 class="mb-4 text-2xl font-bold text-violet-700">Create Post</h3>
        <form @submit.prevent="createPostHandler" class="flex flex-col">
          <div class="flex flex-col mb-4">
            <label for="title"><span class="text-red-600">* </span>Title:</label>
            <textarea
              v-model.trim="inputTitle"
              class="p-2 text-xl rounded-md border-none shadow-sm resize-none"
              id="title"
            />
            <Transition name="fade" appear>
              <span v-if="!inputTitle && formFailed" class="text-red-600"
                >Please add the title</span
              >
            </Transition>
          </div>
          <div class="flex flex-col mb-4">
            <label for="content"><span class="text-red-600">* </span>Content:</label>
            <textarea
              v-model.trim="inputBody"
              class="min-h-[6rem] p-2 text-xl rounded-md border-none shadow-sm resize-none"
              id="content"
            />
            <Transition name="fade" appear>
              <span v-if="!inputBody && formFailed" class="text-red-600">
                Please add the content
              </span>
            </Transition>
          </div>
          <h2 v-if="creating">Creating...</h2>
          <div v-else class="flex gap-4">
            <UiButton title="Cancel" type="cancel" @click="$emit('closeEditView')" />
            <UiButton title="Save" type="save" />
          </div>
          <h4 v-if="createFailed">{{ createFailed }}</h4>
        </form>
      </UiCard>
    </div>
  </Transition>
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
