import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'guardians',
    component:()=>import('../views/guardians')
  },
  {
    path: '/guardians',
    name: 'guardians',
    component:()=>import('../views/guardians')
  },
  {
    path: '/guardian/new',
    name:'add-guardian',
    component:()=>import('../components/guardian/add-guardian')
  },
  {
    path: '/guardian/:id',
    name:'edit-guardian',
    component:()=>import('../components/guardian/edit-guardian')
  },
  {
    path: '/urgencies',
    name: 'urgencies',
    component: () => import('../views/urgencies')
  },
  {
    path: `/urgency/new`,
    name: 'add-urgency',
    component: () => import('../components/urgencies/add-urgency')
  },
  {
    path: '/urgency/:id',
    name: 'edit-urgency',
    component: () => import('../components/urgencies/edit-urgency')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
