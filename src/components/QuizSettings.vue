<script setup lang="ts">
import { ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'

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

function startQuiz() {
  quizStore.updateSettings({
    amount: questionAmount.value,
    difficulty: selectedDifficulty.value,
    category: selectedCategory.value
  })
  quizStore.fetchQuestions()
}
</script>

<template>
  <div class="screen">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border middle border-gray-100 dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Quiz Settings
      </h2>      
      
      <div class="space-y-6">
        <!-- Question Count -->
        <div>
        <label class="block text-sm font-medium mb-1 text-[#64748b] dark:text-[#94a3b8]">
          Number of Questions
        </label>
        <input
          v-model.number="questionAmount"
          type="number"
          min="5"
          max="20"
          class="w-full py-2 px-3 bg-[#f1f5f9] dark:bg-[#334155] border-none rounded-lg text-[#1e293b] dark:text-[#e2e8f0] focus:ring-2 focus:ring-[#3b82f6]"
        >
      </div>
        
        <!-- Difficulty -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="diff in difficulties"
              :key="diff.value"
              @click="selectedDifficulty = diff.value"
              class="py-2 px-3 text-sm rounded-lg transition-colors"
              :class="{
                'bg-indigo-600 text-white': selectedDifficulty === diff.value,
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': selectedDifficulty !== diff.value
              }"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>
        
        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select 
            v-model="selectedCategory"
            class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option :value="undefined">Any Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        
        <!-- Start Button -->
        <button
          @click="quizStore.settings = { amount: questionCount, difficulty: selectedDifficulty, category: selectedCategory }; quizStore.fetchQuestions()"
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          Start Quiz
        </button>
      </div>
    </div>
  </div>
</template>