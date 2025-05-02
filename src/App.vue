<template>
  <div
    class="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f1f5f9] transition-colors duration-200">
    <QuizHeader />

    <!-- <main class="screen px-4 py-8 max-w-3xl">
      <div v-if="quizStore.loading" class="flex flex-col items-center justify-center h-64">
        <div class="w-12 h-12 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-lg font-medium text-[#3b82f6]">Preparing your quiz...</p>
      </div>

      <div v-else-if="quizStore.error" class="bg-white dark:bg-[#1e293b] middle w-[80%] rounded-2xl p-6 shadow-sm text-center">
        <div class="flex items-center justify-center pb-4">
          <div
          class="w-16 h-16 bg-[#fee2e2] dark:bg-[#7f1d1d] rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#dc2626] dark:text-[#fca5a5]" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        </div>
        <h3 class="text-xl font-bold pb-2">Oops!</h3>
        <p class="pb-6">{{ quizStore.error }}</p>
        <button @click="quizStore.fetchQuestions()"
          class="px-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg font-medium transition-colors">
          Try Again
        </button>
      </div>

      <QuizSettings v-if="!quizStore.questions.length && !quizStore.loading && !quizStore.error" />
      <QuizGame v-else-if="quizStore.questions.length && !quizStore.quizCompleted" />
      <QuizResults v-else-if="quizStore.quizCompleted" />
    </main> -->

    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import QuizHeader from '@/components/QuizHeader.vue'
import QuizGame from '@/components/QuizGame.vue'
import { useThemeStore } from '@/stores/theme'
import QuizSettings from '@/components/QuizSettings.vue'
import QuizResults from '@/components/QuizResults.vue'


const quizStore = useQuizStore()
const themeStore = useThemeStore()
const isDark = ref(false)

onMounted(() => {
  themeStore.initTheme()
})

</script>

<style>
.dark {
  color-scheme: dark;
}

:root {
  color-scheme: light dark;
}

/* Smooth transitions */
.bg-gray-50,
.bg-gray-900,
.text-gray-800,
.text-gray-100,
.bg-white,
.bg-gray-800,
.border-gray-200,
.border-gray-600 {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>