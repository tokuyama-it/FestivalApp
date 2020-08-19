import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2bd63a0a = () => interopDefault(import('../pages/serch/index.vue' /* webpackChunkName: "pages/serch/index" */))
const _fc5b483a = () => interopDefault(import('../pages/serch/allEvent/index.vue' /* webpackChunkName: "pages/serch/allEvent/index" */))
const _65d28808 = () => interopDefault(import('../pages/serch/food/index.vue' /* webpackChunkName: "pages/serch/food/index" */))
const _7d7f9c89 = () => interopDefault(import('../pages/serch/omise/index.vue' /* webpackChunkName: "pages/serch/omise/index" */))
const _4191d46a = () => interopDefault(import('../pages/serch/stage/index.vue' /* webpackChunkName: "pages/serch/stage/index" */))
const _56117ff6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/serch",
    component: _2bd63a0a,
    name: "serch"
  }, {
    path: "/serch/allEvent",
    component: _fc5b483a,
    name: "serch-allEvent"
  }, {
    path: "/serch/food",
    component: _65d28808,
    name: "serch-food"
  }, {
    path: "/serch/omise",
    component: _7d7f9c89,
    name: "serch-omise"
  }, {
    path: "/serch/stage",
    component: _4191d46a,
    name: "serch-stage"
  }, {
    path: "/",
    component: _56117ff6,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
