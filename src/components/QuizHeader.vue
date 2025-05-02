<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { onMounted, ref } from 'vue'

const themeStore = useThemeStore()
const isRippling = ref(false)

// Initialize theme when component mounts
onMounted(() => {
  themeStore.initTheme()
})

// Toggle theme with ripple effect
function toggleThemeWithRipple() {
  // Show ripple effect
  isRippling.value = true
  
  // Toggle theme (this immediately updates DOM in the store)
  themeStore.toggleTheme()
  
  // Hide ripple after animation completes
  setTimeout(() => {
    isRippling.value = false
  }, 600)
}
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="screen px-4 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-extrabold text-blue-600 dark:text-blue-400 transition-colors duration-200">
        Quizzy
      </h1>

      <button 
        @click="toggleThemeWithRipple"
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative overflow-hidden"
        aria-label="Toggle dark mode"
      >
        <!-- Ripple effect -->
        <span
          v-if="isRippling"
          class="ripple-effect absolute inset-0 bg-blue-200 dark:bg-blue-800 rounded-full"
        ></span>
        
        <!-- Sun icon (light mode) -->
        <svg 
          v-if="!themeStore.isDark" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-blue-600 relative z-10" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        
        <!-- Moon icon (dark mode) -->
        <svg 
          v-else
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-yellow-300 relative z-10" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.ripple-effect {
  animation: ripple 0.6s ease-out forwards;
  transform: scale(0);
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
</style>  