import { onMounted, ref } from "vue";

// Using Composition API with TypeScript
export function useThemeToggle() {
  const themeToggleDarkIcon = ref<HTMLElement | null>(null);
  const themeToggleLightIcon = ref<HTMLElement | null>(null);
  const themeToggleBtn = ref<HTMLElement | null>(null);

  // Initialize theme
  const initTheme = () => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      themeToggleLightIcon.value?.classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleDarkIcon.value?.classList.remove("hidden");
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    // Toggle icons
    themeToggleDarkIcon.value?.classList.toggle("hidden");
    themeToggleLightIcon.value?.classList.toggle("hidden");

    // If set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    }
    // If NOT set via local storage previously
    else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  };

  // Set up component
  onMounted(() => {
    initTheme();

    if (themeToggleBtn.value) {
      themeToggleBtn.value.addEventListener("click", toggleTheme);
    }
  });

  return {
    themeToggleDarkIcon,
    themeToggleLightIcon,
    themeToggleBtn,
    toggleTheme,
  };
}
