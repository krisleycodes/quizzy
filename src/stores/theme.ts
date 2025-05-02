import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  // Initialize theme
  const initTheme = () => {
    const savedTheme = localStorage.getItem('quizzy-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
    applyTheme()
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Apply theme to DOM
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.setProperty('color-scheme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.setProperty('color-scheme', 'light')
    }
    localStorage.setItem('quizzy-theme', isDark.value ? 'dark' : 'light')
  }

  // Watch for changes
  watch(isDark, applyTheme, { immediate: true })

  return {
    isDark,
    initTheme,
    toggleTheme
  }
})