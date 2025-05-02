<script setup lang="ts">
import { ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'

// Define the QuizSettings type that was missing
interface QuizSettings {
  amount: number;
  difficulty: string;
  category: number | undefined;
}

const router = useRouter()
const quizStore = useQuizStore()

const difficulties = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'mixed', label: 'Mixed' }
]

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Books' },
  { id: 11, name: 'Film' },
  { id: 12, name: 'Music' },
  { id: 15, name: 'Video Games' },
  { id: 17, name: 'Science' },
  { id: 18, name: 'Computers' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' }
]

const selectedDifficulty = ref(quizStore.settings.difficulty)
const selectedCategory = ref(quizStore.settings.category)
const questionAmount = ref(quizStore.settings.amount)

async function startQuiz() {
  // Create new settings object with validated values
  const validatedSettings: QuizSettings = {
    amount: questionAmount.value,
    difficulty: selectedDifficulty.value,
    category: selectedCategory.value || undefined
  }
  
  // Update settings using direct assignment
  quizStore.settings = validatedSettings
  
  // Fetch questions based on the updated settings
  try {
    await quizStore.fetchQuestions()
    // If successful, navigate to the quiz page
    router.push('/quiz')
  } catch (error) {
    // Error handling is done in the store and displayed in the template
    console.error('Failed to fetch questions:', error)
  }
}

// New function to handle "Try Again" click
function tryAgain() {
  // Clear the error state in the store
  quizStore.error = null
}

</script>

<template>
  <div class="max-w-md mx-auto">
    <div v-if="quizStore.loading" class="flex flex-col items-center middle justify-center h-64">
      <div class="w-12 h-12 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-lg font-medium text-[#3b82f6]">Preparing your quiz...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="quizStore.error"
      class="bg-white middle dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm text-center mx-auto pb-6 lg:w-[30%]">
      <div class="lg:px-[42.5%] x-button">
        <div
        class="w-16 h-16 bg-[#fee2e2] dark:bg-[#7f1d1d] rounded-full flex items-center justify-center mx-auto my-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#dc2626] dark:text-[#fca5a5]" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      </div>
      <h3 class="text-xl font-bold py-2">Oops!</h3>
      <p class="pb-4">{{ quizStore.error }}</p>
      <button @click="tryAgain"
        class="px-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg font-medium transition-colors">
        Try Again
      </button>
    </div>

    <div v-else class="middle mx-auto lg:w-[50%] settings">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Quiz Settings
      </h2>

      <div class="space-y-6">
        <!-- Question Count -->
        <div class="py-2">
          <label class="block text-sm font-medium text-[#64748b] dark:text-[#94a3b8]">
            Number of Questions
          </label>
          <input v-model.number="questionAmount" type="number" min="5" max="20"
            class="w-full py-2 px-3 bg-[#f1f5f9] dark:bg-[#334155] border-none rounded-lg text-[#1e293b] dark:text-[#e2e8f0] focus:ring-2 focus:ring-[#3b82f6]">
        </div>

        <!-- Difficulty -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
            Difficulty
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="diff in difficulties" :key="diff.value" @click="selectedDifficulty = diff.value"
              class="py-2 px-3 text-sm rounded-lg transition-colors" :class="{
                'bg-indigo-600 text-white': selectedDifficulty === diff.value,
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': selectedDifficulty !== diff.value
              }">
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Category -->
        <div class="py-3">
          <label class="block text-sm py-1 font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select v-model="selectedCategory"
            class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option :value="undefined">Any Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Start Button -->
        <button @click="startQuiz"
          class="w-full py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg transition-colors mt-4 flex items-center justify-center">
          Start Quiz
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<style>
@media screen and (max-width: 480px) {
  .x-button {
    padding-left: 25%;
  }

  .settings {
    width: 90%;
  }
}

</style>