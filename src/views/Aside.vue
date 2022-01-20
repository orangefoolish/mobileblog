<template >
    <div style="width: 100%;background: #000000;border-bottom: 3px black solid"><img src="@/assets/mb_resources/img/aside.png" style="z-index: 1;width: 3rem;" @click="this.openlist"></div>
    <div :class="this.open?'pull':'push'">
      <div style="width: 100%;height: 12vh">
        <img src="@/assets/img/touxiang.png" style="width: 5rem;padding-left: 1.2rem">
        <span style="font-weight: 1000;font-size: 2rem;position: relative;top: -1.5rem;left: 1rem">老黄狗的博客</span>
        <img src="@/assets/mb_resources/img/close.png" style="width: 1.5rem;position:relative;top: -7rem;left: 90%" @click="this.openlist">
      </div>
      <ul style="width: 100%;height:62vh;color:rgba(0,0,0,0.97);font-size: 2rem;opacity: 0.7;text-align:center;overflow-y: scroll;padding-top: 3vh">
        <button class="select" @click="this.PageJump(1)"><img src="@/assets/mb_resources/img/home.png" class="img"> <span style="font-size: 25px">网站主页</span></button>
        <button class="select" @click="this.PageJump(2)"><img src="@/assets/mb_resources/img/blog.png" class="img"> <span style="font-size: 25px">个人博客</span></button>
        <button class="select" @click="this.PageJump(3)"><img src="@/assets/mb_resources/img/music.png" class="img"><span style="font-size: 25px">音乐盒</span> </button>
        <button class="select" @click="this.PageJump(4)"><img src="@/assets/mb_resources/img/tags.png" class="img"> <span style="font-size: 25px">标签墙</span></button>
        <button class="select" @click="this.PageJump(5)"><img src="@/assets/mb_resources/img/tags.png" class="img"> <span style="font-size: 25px">友情链接</span></button>
        <button class="select" @click="this.PageJump(6)" ><img src="@/assets/mb_resources/img/login.png" class="img"><span style="font-size: 25px">后台登陆</span> </button>
        <li class="select" style="padding-bottom: 0px;display: inline-block">网站访客人数</li>
        <span style="font-size: 3rem;font-weight: 1000;width:100% ">{{ this.visitnum }}</span>
      </ul>
    </div>
    <div style="width: 100%;height: 10vh;background-color: rgb(0,0,0);position: absolute;top: 86vh;padding-top: 4vh;z-index: 1">
      <p style="color: white;text-align: center">@ {{ this.year }} www.huanggou.top copy right</p>
      <p style="width: 70%;padding-left:15%;padding-right:22%;line-height:22px;color: white;text-align: center;margin-top: 0.5vh"><img src="@/assets/mb_resources/img/sign.jpg" style="padding-right:0.5rem">{{this.message}}</p>
    </div>

</template>

<script>
import "@/assets/mb_resources/css/mb_layout.css"
import "@/assets/css/reset.css"
import request from "@/utils/request";
import global_variable from "./global_variable";
export default {
  name: "Aside",

  data(){
    return{
      open:false,
      visitnum:0,
      year:'',
      message:global_variable.message
    }
  },
  mounted() {
    this.$nextTick(function (){
      this.getvisitnum();
    })
  }
  ,
  methods:{
    openlist(){
      this.open=!this.open;
    },
    PageJump(pageid){
      switch (pageid){
        case 1:
          this.$router.push("/");
          break;
        case 2:
          this.$router.push("/mb_blog");
          break;
        case 3:
          let routeUrl = this.$router.resolve({
            path: "/player",
          });
          window.open(routeUrl.href, '_blank');
          break;
        case 4:
          this.$router.push("/mb_tags");
          break;
        case 5:
          this.$router.push("/mb_sites");
          break;
        case 6:
          this.$router.push("/login");
          break;
      }
      this.open=false;
    },
    getvisitnum(){
      let date = new Date();
      this.year=date.getFullYear();
      request.get("/api/ip").then(res=>{
        this.visitnum=res.data;
      })
    },
  }
}
</script>

<style scoped>

</style>