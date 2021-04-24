import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import saper from "../views/saperView.vue";
import blackJack from "../views/blackJackView.vue";
import dotworld from "../views/dotworldView.vue";
import gallery from "../views/galleryView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/saper/:user",
    name: "saperView",
    component: saper,
    props: true,
  },
  {
    path: "/blackJack",
    name: "blackJackView",
    component: blackJack,
  },
  {
    path: "/dotworld/:user",
    name: "dotworldView",
    component: dotworld,
    props: true,
  },
  {
    path: "/gallery/:user",
    name: "galleryView",
    component: gallery,
    props: true,
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

export default router;
