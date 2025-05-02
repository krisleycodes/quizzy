<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'
import { useRouter } from 'vue-router'

const router = useRouter()

const quizStore = useQuizStore()

const scorePercentage = computed(() => {
  return Math.round((quizStore.score / quizStore.totalQuestions) * 100)
})

const performanceMessage = computed(() => {
  if (scorePercentage.value >= 80) return 'Excellent!'
  if (scorePercentage.value >= 60) return 'Good job!'
  if (scorePercentage.value >= 40) return 'Not bad!'
  return 'Keep practicing!'
})

onMounted(() => {
  if (scorePercentage.value >= 80) {
    launchConfetti()
  }

  gsap.from('.middle', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'back.out'
  })
})

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#2563EB', '#1E40AF', '#3B82F6']
  })
}


function restartQuiz() {
  quizStore.resetQuiz()
  quizStore.fetchQuestions()
}

function goToSettings() {
  quizStore.returnToSettings()
  router.push('/')
}

</script>

<template>
  <div class="middle bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-md text-center">
    <h2 class="text-2xl font-bold pb-4 text-blue-600 dark:text-blue-400">
      Quiz Completed!
    </h2>

    <div class="pb-6">
      <p class="text-lg">
        You scored <span class="font-bold text-blue-600 dark:text-blue-400">{{ quizStore.score }}</span> out of
        <span class="font-bold">{{ quizStore.totalQuestions }}</span>
      </p>
    </div>

    <div class="flex justify-center gap-4">
      <button @click="restartQuiz"
        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
        Play Again
      </button>
      <button @click="goToSettings"
        class="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors">
        New Settings
      </button>
    </div>
  </div>
</template>

<style>

</style>