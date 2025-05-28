import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import BuchenView from '@/views/BuchenView.vue'
import BuchungenView from '@/views/BuchungenView.vue'
import BookingOverView from '@/views/BookingOverView.vue'
import PaymentView from '@/views/PaymentView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/buy',
    name: 'buy',
    component: BuchenView
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: BuchungenView
  },
  {
    path: '/overview',
    name: 'overview',
    component: BookingOverView
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
