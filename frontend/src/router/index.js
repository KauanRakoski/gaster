import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CreatePage from '../views/CreatePage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import api from '../api';
import EditPage from '@/views/EditPage.vue';
import LandingPage from '@/views/LandingPage.vue';

const adminAuth = (to, from, next) => {
  var token = localStorage.getItem("token");
  
  if (!token)
    next('/login');

  api.post('/validate', {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => next())
  .catch(() => next('/login'));
}

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    beforeEnter: adminAuth
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/recover/:token?',
    name: 'recover',
    component: () => import('../views/RecoverPage.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePage,
    beforeEnter: adminAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    beforeEnter: adminAuth
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditPage,
    beforeEnter: adminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
