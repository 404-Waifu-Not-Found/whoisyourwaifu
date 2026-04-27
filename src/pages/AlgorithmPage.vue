<script setup lang="ts">
import { useI18n } from '@/i18n'

const { labels } = useI18n()
</script>

<template>
  <article class="paper-layout">
    <header class="paper-header">
      <p class="paper-kicker">{{ labels.algorithmKicker }}</p>
      <h1>{{ labels.algorithmTitle }}</h1>
      <p class="paper-abstract">{{ labels.algorithmIntro }}</p>
      <p class="paper-abstract">
        {{ labels.algorithmExtraAbstract }}
      </p>
    </header>

    <section class="paper-section">
      <h2>{{ labels.algorithmSamplingHeading }}</h2>
      <p>{{ labels.algorithmSections[0].body }}</p>
      <figure class="paper-figure">
        <svg viewBox="0 0 760 210" role="img" :aria-label="labels.algorithmFigure1Alt">
          <line x1="80" y1="170" x2="710" y2="170" />
          <line x1="80" y1="32" x2="80" y2="170" />
          <g class="bars">
            <rect x="125" y="50" width="82" height="120" />
            <rect x="275" y="50" width="82" height="120" />
            <rect x="425" y="50" width="82" height="120" />
            <rect x="575" y="50" width="82" height="120" />
          </g>
          <g class="paper-labels">
            <text x="166" y="194">E/I</text>
            <text x="316" y="194">S/N</text>
            <text x="466" y="194">T/F</text>
            <text x="616" y="194">J/P</text>
            <text x="166" y="42">8</text>
            <text x="316" y="42">8</text>
            <text x="466" y="42">8</text>
            <text x="616" y="42">8</text>
          </g>
        </svg>
        <figcaption>{{ labels.algorithmSamplingCaption }}</figcaption>
      </figure>
    </section>

    <section class="paper-section">
      <h2>{{ labels.algorithmVectorHeading }}</h2>
      <p>{{ labels.algorithmSections[1].body }}</p>
      <p>{{ labels.algorithmSections[2].body }}</p>
      <p>
        {{ labels.algorithmConfidenceNote }}
      </p>
      <div class="paper-equation">
        <span>{{ labels.algorithmAxisScoreFormula }}</span>
        <span>{{ labels.algorithmConfidenceFormula }}</span>
      </div>
      <figure class="paper-figure">
        <svg viewBox="0 0 760 240" role="img" :aria-label="labels.algorithmFigure2Alt">
          <polygon points="380,30 620,120 380,210 140,120" class="radar-grid" />
          <line x1="380" y1="30" x2="380" y2="210" />
          <line x1="140" y1="120" x2="620" y2="120" />
          <polygon points="380,58 528,120 380,185 232,120" class="radar-fill" />
          <circle cx="380" cy="58" r="5" />
          <circle cx="528" cy="120" r="5" />
          <circle cx="380" cy="185" r="5" />
          <circle cx="232" cy="120" r="5" />
          <g class="paper-labels">
            <text x="380" y="22">I</text>
            <text x="638" y="124">N</text>
            <text x="380" y="232">F</text>
            <text x="112" y="124">J</text>
          </g>
        </svg>
        <figcaption>{{ labels.algorithmVectorCaption }}</figcaption>
      </figure>
    </section>

    <section class="paper-section">
      <h2>{{ labels.algorithmRankingHeading }}</h2>
      <p>{{ labels.algorithmSections[3].body }}</p>
      <p>
        {{ labels.algorithmRankingNote }}
      </p>
      <div class="paper-equation">
        <span>{{ labels.algorithmFormula }}</span>
      </div>
      <figure class="paper-figure">
        <svg viewBox="0 0 760 220" role="img" :aria-label="labels.algorithmFigure3Alt">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" />
            </marker>
          </defs>
          <g class="flow">
            <rect x="45" y="74" width="140" height="60" />
            <rect x="225" y="74" width="150" height="60" />
            <rect x="415" y="74" width="150" height="60" />
            <rect x="605" y="74" width="110" height="60" />
            <path d="M185 104h38" />
            <path d="M375 104h38" />
            <path d="M565 104h38" />
            <text x="115" y="109">{{ labels.algorithmFlowAnswers }}</text>
            <text x="300" y="109">{{ labels.algorithmFlowVector }}</text>
            <text x="490" y="109">{{ labels.algorithmFlowDistance }}</text>
            <text x="660" y="109">{{ labels.algorithmFlowRank }}</text>
          </g>
        </svg>
        <figcaption>{{ labels.algorithmRankingCaption }}</figcaption>
      </figure>
    </section>

    <section class="paper-section">
      <h2>{{ labels.algorithmFitHeading }}</h2>
      <p>{{ labels.algorithmSections[4].body }}</p>
      <div class="paper-equation">
        <span>{{ labels.algorithmFitFormula }}</span>
        <span>{{ labels.algorithmLowConfidenceCap }}</span>
      </div>
      <p>
        {{ labels.algorithmFitNote }}
      </p>
    </section>
  </article>
</template>
