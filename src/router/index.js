import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/RoomsView.vue"),
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

  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/UserProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/update/:id",
    props: true,
    name: "Update",
    // route level code-splitting
    // this generates a separate chunk (update.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "update" */ "../views/UpdateRoom.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/create",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (create.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/CreatedRoom.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/views/:id",
    name: "View",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (views.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "views" */ "../views/ViewRoom.vue"),
    meta: {
      requiresAuth: true,
    },
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
