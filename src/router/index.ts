import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import AllPosts from '../views/AllPosts.vue'
import MyPosts from '../views/MyPosts.vue'
import CreatePost from '../views/CreatePost.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'allPosts',
      component: AllPosts
    },
    {
      path: '/my-posts',
      name: 'myPosts',
      component: MyPosts
    },
    {
      path: '/create-post',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useUserStore()
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})

// router.beforeEach((to, from) => {
//   const userStore = useUserStore()

//   if (userStore.isAuthenticated) {
//     if (to.name === 'login') {
//       return '/'
//     } else if (to.path !== from.path) {
//       return to.path
//     }
//   } else {
//     if (to.name !== 'login') {
//       return '/login'
//     }
//   }
// })

export default router
