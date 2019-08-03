import Vue from 'vue'
import Router from 'vue-router'
import UserDashboardLayout from '@/layout/user/UserDashboardLayout'
import AdminDashboardLayout from '@/layout/admin/AdminDashboardLayout'
import DefaultLayout from '@/layout/DefaultLayout' 

import store from './store';

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/dashboard',
      redirect: 'dashboard',
      component: UserDashboardLayout,
      meta: {
        onlyUser: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/Profile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: '/courses',
          name: 'courses',
          component: () => import(/* webpackChunkName: "demo" */ './views/Courses.vue')
        }
      ]
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'landing',
          component: () => import(/* webpackChunkName: "demo" */ './views/Landing.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        },
        {
          path: '/admin-login',
          name: 'admin-login',
          component: () => import(/* webpackChunkName: "demo" */ './views/admin/Login.vue')
        }
      ]
    },
    {
      path: '/admin-confirmation',
      redirect: 'admin-confirmation',
      component: AdminDashboardLayout,
      meta: {
        onlyAdmin: true
      },
      children: [
        {
          path: '/admin-confirmation',
          name: 'admin-confirmation',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/admin/Confirmation.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userAuthed = store.state.userProfile ? true : false;
  const adminAuthed = store.state.admin ? true : false;
  const onlyUser = to.matched.some(record => record.meta.onlyUser);
  const onlyAdmin = to.matched.some(record => record.meta.onlyAdmin);

  if(onlyUser && !userAuthed) {
    return next({
      path: '/login'
    })
  }

  if(onlyAdmin && !adminAuthed) {
    return next({
      path: '/admin-login'
    })
  }

  next()
})

export default router;