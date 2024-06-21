import { createWebHistory, createRouter } from "vue-router";
// import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import Comment from "./components/Comment.vue";
import Album from "./components/Album.vue";
import Photo from "./components/Photos.vue";
import Todo from "./components/Todos.vue";
import AllTodos from "./components/AllTodos.vue";
const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "Comment",
    component: Comment,
    path: "/comments",
    props: true,
  },
  {
    name: "Album",
    component: Album,
    path: "/albums",
  },
  {
    name: "Photos",
    component: Photo,
    path: "/photos",
  },
  {
    name: "Todos",
    component: Todo,
    path: "/todos",
  },
  {
    name: "AllTodos",
    component: AllTodos,
    path: "/todoById",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
