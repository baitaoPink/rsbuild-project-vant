import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/home.vue'
import About from '../views/about.vue'
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  // Vue i18n config here
});
const routes = [
  { path: '/', component: Home,meta: {
    i18n: 'home',
  }, },
  { path: '/about', component: About,meta: {
    i18n: 'about',
  }, },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
console.log(routes)

export default router;