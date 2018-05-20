import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Page from '@/components/Pages/Page'
import CreatePage from '@/components/Pages/CreatePage'
import Profile from '@/components/User/Profile'
import Sigin from '@/components/User/Sigin'
import Sigup from '@/components/User/Sigup'
import Pages from '@/components/Pages/Pages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/page',
      name: 'Page',
      component: Page
    },
    {
      path: '/page/new',
      name: 'CreatePage',
      component: CreatePage
    },
    {
      path: '/page/:id',
      name: 'Pages',
      component: Pages
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/sigin',
      name: 'Sigin',
      component: Sigin
    },
    {
      path: '/sigup',
      name: 'Sigup',
      component: Sigup
    }
  ],
  mode: 'history'
})
