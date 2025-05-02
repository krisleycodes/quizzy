<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { gsap } from 'gsap'

const quizStore = useQuizStore()

onMounted(() => {
  quizStore.startTimer()
  animateQuestionIn()
})

watch(() => quizStore.currentQuestionIndex, () => {
  animateQuestionChange()
})

function animateQuestionIn() {
  gsap.from('.question-container', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out'
  })
}

function animateQuestionChange() {
  gsap.to(".question-container", {
    opacity: 0,
    y: -20,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      gsap.fromTo(".question-container",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  })
}

watch(() => quizStore.currentQuestionIndex, () => {
  resetAnswerStyles()
})

function resetAnswerStyles() {
  gsap.to(".answer-option", {
    backgroundColor: '',
    color: '',
    duration: 0.1
  })
}

function selectAnswer(answer: string) {
  if (quizStore.selectedAnswer) return

  quizStore.selectedAnswer = answer
  const correct = answer === quizStore.currentQuestion?.correct_answer
  const answerElement = document.querySelector(`[data-answer="${answer}"]`)

  // Visual feedback for selected answer
  if (answerElement) {
    gsap.to(answerElement, {
      backgroundColor: correct ? '#10B981' : '#EF4444',
      color: 'white',
      duration: 0.2
    })

    // Show correct answer if wrong was selected
    if (!correct) {
      const correctElement = document.querySelector(
        `[data-answer="${quizStore.currentQuestion?.correct_answer}"]`
      )
      if (correctElement) {
        gsap.to(correctElement, {
          backgroundColor: '#10B981',
          color: 'white',
          duration: 0.2,
          delay: 0.2
        })
      }
    }
  }

  // Move to next question after delay
  setTimeout(() => {
    if (answer === quizStore.currentQuestion?.correct_answer) {
      quizStore.score++
    }
    quizStore.nextQuestion()
  }, 1500)
}

const progressBarStyle = computed(() => ({
  width: `${quizStore.progress}%`,
  backgroundColor: '#3b82f6'
}))
</script>

<template>
  <div class="lg:middle screen py-10 lg:w-[50%]">

    <div class="question-container bg-white dark:bg-[#1e293b] rounded-2xl space-y-20 shadow-sm p-6">
      <!-- Progress -->
      <div class="flex justify-between items-center pb-6">
        <div class="w-full bg-[#f1f5f9] dark:bg-[#334155] rounded-full h-2">
          <div class="h-2 rounded-full transition-all duration-300 ease-out" :style="progressBarStyle"></div>
        </div>
        <span class="pl-4 text-sm font-medium text-[#3b82f6]">
          {{ quizStore.currentQuestionIndex + 1 }}/{{ quizStore.totalQuestions }}
        </span>
      </div>

      <!-- Timer -->
      <div class="flex justify-center pb-6">
        <div class="relative w-16 h-16">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" stroke-width="6"
              class="dark:stroke-[#334155]" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" stroke-width="6" stroke-dasharray="283"
              :stroke-dashoffset="283 - (283 * quizStore.timeLeft) / 15" transform="rotate(-90 50 50)" />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#3b82f6]">
            {{ quizStore.timeLeft }}
          </div>
        </div>
      </div>

      <!-- Question -->
      <div class="pb-8">
        <div class="p-4 bg-[#f8fafc] dark:bg-[#0f172a] rounded-lg">
          <h3 class="text-lg font-medium text-center">
            {{ quizStore.formattedQuestion.question }}
          </h3>
        </div>
      </div>

      <!-- Answers -->
      <div class="grid gap-3 pb-8">
        <button v-for="(answer, index) in quizStore.formattedQuestion.all_answers" :key="index"
          @click="selectAnswer(answer)" :disabled="!!quizStore.selectedAnswer" :data-answer="answer"
          class="answer-option px-4 py-3 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-lg text-left transition-all"
          :class="{
            'hover:border-[#3b82f6] hover:shadow-sm': !quizStore.selectedAnswer,
            'cursor-not-allowed': !!quizStore.selectedAnswer
          }">
          <div class="flex items-center">
            <span class="mr-3 font-medium text-[#64748b] dark:text-[#94a3b8]">
              {{ String.fromCharCode(65 + index) }}.
            </span>
            <span>{{ answer }}</span>
          </div>
        </button>
      </div>


      <!-- Score -->
      <div class="text-center">
        <div class="inline-flex items-center px-4 py-2 bg-[#f1f5f9] dark:bg-[#334155] rounded-lg">
          <span class="text-sm font-medium mr-2">Score:</span> 
          <span class="font-bold text-[#3b82f6]">{{ quizStore.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>