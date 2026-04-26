<script setup lang="ts">
import { useI18n } from '@/i18n'

const { labels } = useI18n()

const repoUrl = 'https://github.com/404-Waifu-Not-Found/whoisyourwaifu'
const issuesUrl = `${repoUrl}/issues`
const pullsUrl = `${repoUrl}/pulls`
const creatorUrl = 'https://github.com/UnoxyRich'
</script>

<template>
  <section class="contributors-layout">
    <div class="section-heading">
      <p class="eyebrow">{{ labels.contributorsEyebrow }}</p>
      <h1>{{ labels.contributorsTitle }}</h1>
      <p>{{ labels.contributorsIntro }}</p>
    </div>

    <div class="contributor-actions">
      <a class="button primary" :href="repoUrl" target="_blank" rel="noreferrer">{{ labels.contributorsRepo }}</a>
      <a class="button ghost" :href="issuesUrl" target="_blank" rel="noreferrer">{{ labels.contributorsIssue }}</a>
      <a class="button ghost" :href="pullsUrl" target="_blank" rel="noreferrer">{{ labels.contributorsPr }}</a>
    </div>

    <a class="creator-card" :href="creatorUrl" target="_blank" rel="noreferrer">
      <img src="/avatars/creator.png" :alt="labels.creatorAvatarAlt" />
      <div>
        <span>{{ labels.creatorRole }}</span>
        <h2>{{ labels.creatorName }}</h2>
        <p>{{ labels.creatorBio }}</p>
      </div>
    </a>

    <div class="contributor-list">
      <article v-for="section in labels.contributorsSections" :key="section.title" class="contributor-row">
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
      </article>
    </div>
  </section>
</template>
