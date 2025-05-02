<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz'
import QuizGame from '@/components/QuizGame.vue'
import QuizResults from '@/components/QuizResults.vue'

const quizStore = useQuizStore()
</script>

<template>
  <QuizResults v-if="quizStore.quizCompleted" />
  <QuizGame v-else />
</template>