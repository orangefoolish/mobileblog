import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App";
import mb_Home from "@/views/mb_Home";
import mb_tags from "@/views/mb_Tags";
import ToArticle from "@/views/ToArticle";
import mb_sites from "../views/mb_sites";


const routes = [

  {
    path:'/*',
    name: 'mbLayout',
    component: ()=>import("../layout/mbLayout"),
    children:[
      {
        path:'/',
        name: "mb_Home",
        component: ()=>import("../views/mb_Home")
      },
      {
        path: '/mb_blog',
        name: 'mb_blog',
        component: ()=>import("../views/mb_Blog")
      },{
      path: '/mb_tags',
        name: 'mb_tags',
        component: ()=>import("../views/mb_Tags")
      },
      {
        path:'/mb_article',
        name:'ToArticle',
        component: ()=>import("../views/ToArticle")
      },
      {
        path:'/mb_sites',
        name:'mb_site',
        component:()=>import("../views/mb_sites")
      },
      {
        path:'/mb_blogbytags',
        name:'mb_blogbytags',
        component: ()=>import("../views/mb_BlogByTags")
      }
    ]
},
  {
    path: '/login',
    name:'Login',
    component: ()=>import("../views/Login")
  },{
    path: '/player',
    name: 'mb_music',
    component: ()=>import("../views/mb_Music"),
    children:[
      {
        path:'musicmain',
        name:'musicmain',
        component: ()=>import("../views/mb_MusicMain")
      },
      {
        path:'musicsearch',
        name:'search',
        component: ()=>import("../views/mb_MusicHot")
      },
      {
        path:'hot',
        name:'hot',
        component: ()=>import("../views/mb_MusicSearch")
      }
    ]
  },
  {
    path: '/admin',
    name:'Admin',
    component: ()=>import("../views/Admin")
  },
  {
    path: '/index',
    name: 'App',
    component: App
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
