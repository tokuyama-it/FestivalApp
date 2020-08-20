import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cf80bda2 = () => interopDefault(import('../pages/schedule/index.vue' /* webpackChunkName: "pages/schedule/index" */))
const _6c0cc2fa = () => interopDefault(import('../pages/serch/index.vue' /* webpackChunkName: "pages/serch/index" */))
const _a1d7cd4a = () => interopDefault(import('../pages/serch/allEvent/index.vue' /* webpackChunkName: "pages/serch/allEvent/index" */))
const _52847d00 = () => interopDefault(import('../pages/serch/food/index.vue' /* webpackChunkName: "pages/serch/food/index" */))
const _29fb9211 = () => interopDefault(import('../pages/serch/omise/index.vue' /* webpackChunkName: "pages/serch/omise/index" */))
const _23e46c1c = () => interopDefault(import('../pages/serch/stage/index.vue' /* webpackChunkName: "pages/serch/stage/index" */))
const _805d7ce6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/schedule",
    component: _cf80bda2,
    name: "schedule"
  }, {
    path: "/serch",
    component: _6c0cc2fa,
    name: "serch"
  }, {
    path: "/serch/allEvent",
    component: _a1d7cd4a,
    name: "serch-allEvent"
  }, {
    path: "/serch/food",
    component: _52847d00,
    name: "serch-food"
  }, {
    path: "/serch/omise",
    component: _29fb9211,
    name: "serch-omise"
  }, {
    path: "/serch/stage",
    component: _23e46c1c,
    name: "serch-stage"
  }, {
    path: "/",
    component: _805d7ce6,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
