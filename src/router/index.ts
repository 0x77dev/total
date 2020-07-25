import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import firebase from "@/plugins/firebase";
import initFirebase from "@/plugins/firebase/init";
import IAM from "@/views/IAM.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/iam",
    name: "IAM",
    component: IAM,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (firebase.apps.length === 0) initFirebase();

  firebase.analytics().setCurrentScreen(to.path);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !firebase.auth().currentUser) {
    next("auth");
  } else {
    next();
  }
});

export default router;
