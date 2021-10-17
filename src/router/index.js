import Vue from "vue";
import VueRouter from "vue-router";
import RoomsView from "../views/RoomsView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: RoomsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    // route level code-splitting
    // this generates a separate chunk (auth.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "auth" */ "../views/AuthView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Requires auth & no user
  if (requiresAuth && !(await store.dispatch("user/getCurrentUser"))) {
    next({ name: "Auth" });
    // No requires auth and user (auth)
  } else if (!requiresAuth && (await store.dispatch("user/getCurrentUser"))) {
    next({ name: "Home" });
  } else {
    // Anything else
    next();
  }
});

export default router;
