import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ae5abb84 = () => interopDefault(import('../pages/map/index.vue' /* webpackChunkName: "pages/map/index" */))
const _2ac7b48b = () => interopDefault(import('../pages/schedule/index.vue' /* webpackChunkName: "pages/schedule/index" */))
const _38e4aeb2 = () => interopDefault(import('../pages/serch/index.vue' /* webpackChunkName: "pages/serch/index" */))
const _54bf37b7 = () => interopDefault(import('../pages/serch/allEvent/index.vue' /* webpackChunkName: "pages/serch/allEvent/index" */))
const _30e32448 = () => interopDefault(import('../pages/serch/food/index.vue' /* webpackChunkName: "pages/serch/food/index" */))
const _33407135 = () => interopDefault(import('../pages/serch/omise/index.vue' /* webpackChunkName: "pages/serch/omise/index" */))
const _115aadd4 = () => interopDefault(import('../pages/serch/stage/index.vue' /* webpackChunkName: "pages/serch/stage/index" */))
const _7330b6b1 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/map",
    component: _ae5abb84,
    name: "map"
  }, {
    path: "/schedule",
    component: _2ac7b48b,
    name: "schedule"
  }, {
    path: "/serch",
    component: _38e4aeb2,
    name: "serch"
  }, {
    path: "/serch/allEvent",
    component: _54bf37b7,
    name: "serch-allEvent"
  }, {
    path: "/serch/food",
    component: _30e32448,
    name: "serch-food"
  }, {
    path: "/serch/omise",
    component: _33407135,
    name: "serch-omise"
  }, {
    path: "/serch/stage",
    component: _115aadd4,
    name: "serch-stage"
  }, {
    path: "/",
    component: _7330b6b1,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
