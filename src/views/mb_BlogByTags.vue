<template style="">
  <div style="width:100%;overflow-y: scroll;max-height:78vh;position: relative">
    <div v-for="blog in blogs" style="width: 92%;margin: 4%;border: 1px solid;max-height: 100%;overflow: hidden;background-color: white" @click="this.toArticle(blog.id)">
      <p style="width: 96%;text-align: center;padding: 0.5rem;border-bottom: 1px solid">{{blog.title}}<span style="display: block;margin-top: 3px">日期:{{blog.date}} 作者: <span style="color: #99c0e5">老黄狗</span></span></p>
      <p style="font-weight: 700;width:94%;text-align: left;padding: 1rem;" v-html="blog.text"></p>
    </div>
  </div>
</template>

<script>
import "@/assets/css/reset.css"
import global_variable from "@/views/global_variable";
export default {
  name: "mb_BlogByTags",
  data(){
    return{
      blogs:[],
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getblogs();
    })
  },

  methods:{
    toArticle(id){
      global_variable.articleId=id;
      this.$router.push("/mb_article")
    },
    getblogs(){
      this.blogs=global_variable.blogbytags;
    }
  }
}
</script>

<style scoped>
body{
  overflow: scroll
}
</style>