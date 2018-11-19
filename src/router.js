import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Artists from './views/Artists.vue'
import Genres from './views/Genres.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/About.vue")
    },
    {
      path: "/artists",
      name: "artists",
      component: Artists
    },
    {
      path: "/genres",
      name: "genres",
      component: Genres
    }
  ]
});
