<template>
  <div style="width: 88%;margin: 2%;padding: 1rem;border: 1px solid;display: flex;
            display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
    <el-button v-for="tag in this.tags" @click="this.toBlogByTags(tag)"  style="border: 1px solid;background-color:#b1d2ec;height: 2rem;width: 6rem;border-radius: 1rem;text-align: center;margin: 0px;margin-top: 1rem">{{tag}}</el-button>
  </div>
</template>

<script>
import request from "@/utils/request";
import global_variable from "@/views/global_variable";
export default {
  name: "mb_Tags",
  data(){
    return{
      tags:global_variable.tags,
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.load()
    })
  },
  methods:{
    load(){
      request.get("/api/user/getTags").then(
          res=>{
            if(this.tags.length==0){
              global_variable.tags=res.data;
              this.tags=global_variable.tags
            }
          }
      )
    },
    toBlogByTags(tag){
      request.get("/api/user/blogbytags",{params:{"tag":tag}}).then(res=>{
        global_variable.blogbytags=res.data;
        this.$router.push("/mb_BlogByTags");
      })
    }
  }
}
</script>

<style scoped>

</style>