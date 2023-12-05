import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { type PostsState } from '@/types'

export const usePostsStore = defineStore('posts', () => {
  const posts: Ref<PostsState> = ref([])
  const loadingPosts: Ref<boolean> = ref(false)
  const getPosts = computed(() => posts.value)
  const getLoadingPosts = computed(() => loadingPosts.value)

  function setPosts(payload: PostsState) {
    posts.value = payload
  }
  function setLoadingPosts(payload: boolean) {
    loadingPosts.value = payload
  }
  function deletePost(payload: number) {
    posts.value = posts.value.filter((post) => post.id !== payload)
  }

  return { posts, getPosts, setPosts, getLoadingPosts, setLoadingPosts, deletePost }
})
