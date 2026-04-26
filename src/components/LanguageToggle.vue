<script setup lang="ts">
import { useI18n } from '@/i18n'
import type { Locale } from '@/types'

const { locale, setLocale } = useI18n()

function choose(nextLocale: Locale) {
  setLocale(nextLocale)
}
</script>

<template>
  <div class="language-toggle" aria-label="Language">
    <button :class="{ active: locale === 'en' }" type="button" @click="choose('en')">EN</button>
    <button :class="{ active: locale === 'zh' }" type="button" @click="choose('zh')">中</button>
  </div>
</template>
