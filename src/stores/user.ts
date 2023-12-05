import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { type CurrentUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user: Ref<CurrentUser> = ref(null)
  const getUser = computed(() => user.value)
  
  const loadingUser: Ref<boolean> = ref(false)
  const getLoadingUser = computed(() => loadingUser.value)

  const isAuthenticated = computed(() => user.value !== null)

  function setUser(payload: CurrentUser) {
    user.value = payload
  }
  function setLoadingUser(payload: boolean) {
    loadingUser.value = payload
  }

  return { user, getUser, setUser, isAuthenticated, getLoadingUser, setLoadingUser }
})
