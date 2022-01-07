import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";


const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "signup",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user.vue"),
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;