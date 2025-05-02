import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { shuffleArray, decodeHTMLEntities } from '@/utils/helpers'

interface Question {
  category: string
  type: 'multiple' | 'boolean'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correct_answer: string
  incorrect_answers: string[]
  all_answers?: string[]
}

export interface QuizSettings {
  amount: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  category?: number
}

export const useQuizStore = defineStore('quiz', () => {
  // State
  const questions: Ref<Question[]> = ref([])
  const currentQuestionIndex = ref(0)
  const score = ref(0)
  const timeLeft = ref(15)
  const quizCompleted = ref(false)
  const timerId: Ref<number | null> = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedAnswer: Ref<string | null> = ref(null)
  const settings: Ref<QuizSettings> = ref({
    amount: 10,
    difficulty: 'mixed',
  })

  // Getters
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
  const totalQuestions = computed(() => questions.value.length)
  const progress = computed(() => 
    totalQuestions.value > 0 ? (currentQuestionIndex.value / totalQuestions.value) * 100 : 0
  )
  const formattedQuestion = computed(() => ({
    ...currentQuestion.value,
    question: decodeHTMLEntities(currentQuestion.value?.question || ''),
    all_answers: currentQuestion.value?.all_answers?.map(decodeHTMLEntities) || []
  }))

  // Actions
  async function fetchQuestions() {
    loading.value = true
    error.value = null
    try {
      let url = `https://opentdb.com/api.php?amount=${settings.value.amount}`
      
      if (settings.value.difficulty !== 'mixed') {
        url += `&difficulty=${settings.value.difficulty}`
      }
      
      if (settings.value.category) {
        url += `&category=${settings.value.category}`
      }

      const response = await axios.get(url)
      questions.value = response.data.results.map((q: Question) => ({
        ...q,
        all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
      }))
      
      resetQuiz()
    } catch (err) {
      error.value = 'Failed to load questions. Please try again.'
      console.error('Error fetching questions:', err)
    } finally {
      loading.value = false
    }
  }

  function updateSettings(newSettings: QuizSettings) {
    settings.value = newSettings
  }

  function resetQuiz() {
    currentQuestionIndex.value = 0
    score.value = 0
    quizCompleted.value = false
    timeLeft.value = 15
    selectedAnswer.value = null
    stopTimer()
  }

  function returnToSettings() {
    questions.value = []
    currentQuestionIndex.value = 0
    score.value = 0
    timeLeft.value = 15
    selectedAnswer.value = null
    quizCompleted.value = false
    stopTimer()
  }

  function startTimer() {
    stopTimer()
    timeLeft.value = 15
    timerId.value = window.setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        stopTimer()
        handleTimeout()
      }
    }, 1000)
  }

  function stopTimer() {
    if (timerId.value) {
      clearInterval(timerId.value)
      timerId.value = null
    }
  }

  function handleTimeout() {
    selectedAnswer.value = null
    nextQuestion()
  }

  function submitAnswer(answer: string) {
    selectedAnswer.value = answer
    stopTimer()
    
    if (answer === currentQuestion.value?.correct_answer) {
      score.value++
    }

    // Add animation delay before moving to next question
    setTimeout(() => {
      nextQuestion()
    }, 1500)
  }

  function nextQuestion() {
    selectedAnswer.value = null

    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
      selectedAnswer.value = null // Reset selection
      timeLeft.value = 15
      startTimer()
    } else {
      quizCompleted.value = true
    }
  }
  return {
    questions,
    currentQuestionIndex,
    score,
    timeLeft,
    quizCompleted,
    loading,
    error,
    selectedAnswer,
    settings,
    currentQuestion,
    totalQuestions,
    progress,
    returnToSettings,
    formattedQuestion,
    fetchQuestions,
    resetQuiz,
    startTimer,
    stopTimer,
    submitAnswer,
    updateSettings,
    nextQuestion
  }
})