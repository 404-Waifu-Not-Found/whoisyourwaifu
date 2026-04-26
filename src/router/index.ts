import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import QuizPage from '@/pages/QuizPage.vue'
import ResultPage from '@/pages/ResultPage.vue'
import RosterPage from '@/pages/RosterPage.vue'
import AlgorithmPage from '@/pages/AlgorithmPage.vue'
import ContributorsPage from '@/pages/ContributorsPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/quiz', name: 'quiz', component: QuizPage },
    { path: '/result', name: 'result', component: ResultPage },
    { path: '/roster', name: 'roster', component: RosterPage },
    { path: '/algorithm', name: 'algorithm', component: AlgorithmPage },
    { path: '/contributors', name: 'contributors', component: ContributorsPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
