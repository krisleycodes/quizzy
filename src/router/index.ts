import { createRouter, createWebHistory } from 'vue-router'
import QuizGame from '@/views/QuizPage.vue'
import QuizSettings from '@/views/SettingsPage.vue'

const routes = [
  {
    path: '/',
    name: 'settings',
    component: QuizSettings
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizGame
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router