<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LanguageToggle from '@/components/LanguageToggle.vue'
import { useI18n } from '@/i18n'

const { labels } = useI18n()
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" :aria-label="labels.homeLabel">
        <span class="brand-mark">LPTI</span>
        <span class="brand-text">
          <span>{{ labels.brand }}</span>
          <small>{{ labels.subtitle }}</small>
        </span>
      </RouterLink>
      <nav class="nav-actions" :aria-label="labels.primaryNavigation">
        <RouterLink to="/quiz">{{ labels.navQuiz }}</RouterLink>
        <RouterLink to="/roster">{{ labels.navRoster }}</RouterLink>
        <RouterLink to="/algorithm">{{ labels.navAlgorithm }}</RouterLink>
        <RouterLink to="/contributors">{{ labels.navContributors }}</RouterLink>
        <LanguageToggle />
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <a
        class="github-link"
        href="https://github.com/404-Waifu-Not-Found/whoisyourwaifu"
        target="_blank"
        rel="noreferrer"
        :aria-label="labels.githubRepository"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.94c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.82 0 .27.18.59.69.49A10.16 10.16 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
          />
        </svg>
        <span>{{ labels.github }}</span>
      </a>
      <p>{{ labels.translationHelp }}</p>
      <RouterLink class="footer-link" to="/algorithm">{{ labels.navAlgorithm }}</RouterLink>
      <RouterLink class="footer-link" to="/contributors">{{ labels.navContributors }}</RouterLink>
      <img
        class="visit-counter"
        src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fwaifu.ccwu.cc&label=waifu.ccwu.cc&icon=eye-fill&color=%23e84f4f"
        :alt="labels.visitCounterAlt"
        loading="lazy"
      />
    </footer>
  </div>
</template>
