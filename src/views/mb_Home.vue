<template>
  <div style="height: 100%;overflow-y: hidden">
    <div style="width: 94%;height: 6vh;border: 1px solid;position:absolute;top:5vh;margin:3%;margin-top:calc(3vh + 2px);background-color: white;padding-top: 2vh">
      <img src="@/assets/mb_resources/img/announce.png" style="width: 2rem;padding-left: 2rem">
      <span style="font-size: 1rem;font-weight: 1000;position:relative;top: -0.5rem;left: 4rem">欢迎来到狗哥的博客</span>
    </div>
    <div @click="this.toArticle(this.Blog.id)" style="width: 94%;height: 65vh;border: 1px solid;z-index:0;position:absolute;top:14vh;margin:3%;margin-top:3vh;background-color: white;padding-top: 2vh">
      <p style="font-size: 1rem;font-weight: 1000;position:relative;text-align: center;border-bottom: 1px solid;padding-bottom: 2vh">{{this.Blog.title}}</p>
      <p style="font-size: 1rem;font-weight: 1000;position:relative;text-align: left;padding: 1rem" v-html="this.Blog.text"></p>
    </div>
  </div>
</template>
<script>
import "@/assets/mb_resources/css/mb_home.css"
import request from "@/utils/request";
import global_variable from "@/views/global_variable";
import "@/assets/css/reset.css"
export default {
  name:'mb_Home',
  data(){
    return{
      Blog:{}
    }
  },
  mounted() {
    this.$nextTick(function (){
      this.getNewsetBlog()
    })
  },
  methods:{
    toArticle(id){
      global_variable.articleId=id;
      this.$router.push("/mb_article")
    },
    getNewsetBlog(){
      request.get("/api/user/findnewestblog").then(res=>{
        this.Blog=res.data;
      })
    },
  }
}
</script>

<style scoped>

</style>