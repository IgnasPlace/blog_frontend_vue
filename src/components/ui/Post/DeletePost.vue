<script setup lang="ts">
import { Ref, ref } from 'vue'
import UiButton from '../UiButton.vue'
import UiLoading from '../UiLoading.vue'
import { usePostsStore } from '../../../stores/posts'
const props = defineProps(['question', 'post'])
const postsStore = usePostsStore()

const deleting: Ref<boolean> = ref(false)

const deleteHandler = async () => {
  deleting.value = true
  await fetch(`http://localhost:5001/api/v1/posts/${props.post.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then((res) => {
      if (res.ok) {
        postsStore.deletePost(props.post.id)
      }
    })
    .catch((error) => console.log(error))
    .finally(() => {
      deleting.value = false
    })
}
</script>
<template>
  <div v-if="deleting">
    Deleting...
    <UiLoading />
  </div>
  <div v-else class="flex flex-col items-end">
    <h3 class="text-xl mt-4 text-red-600">{{ props.question }}</h3>
    <div class="flex gap-4 pt-4">
      <UiButton @click="$emit('cancel')" title="Cancel" type="cancel" />
      <UiButton @click="deleteHandler" title="Delete" type="delete" />
    </div>
  </div>
</template>
