<template>
  <div style="background-color: white;width: 100%;height: 85vh;overflow-y: scroll">
    <img src="@/assets/mb_resources/img/hotimg.jpg" style="width: 100%">
    <p style="position: absolute;top: 29vh;color: white;padding-left: 5%;font-size: 12px">更新日期:{{this.date}}</p>
    <div style="padding: 5%;font-size: 20px">这部分我懒得做了,因为由于网易云音乐改动的因素,许多歌需要客户端上才
      能听（狗资本家）,导致这个接口很多歌都无法获取到url了，所以也没必要继续完成了</div>
  </div>
</template>

<script>
import request from "../utils/request";

export default {
  name: "mb_Music_Hot",
  data(){
    return{
      date:null,
    }
  },
  mounted() {
    this.$nextTick(function () {
      const nowdate = new Date();
      this.date=nowdate.getMonth()+1+"月"+nowdate.getDate()+"日";
    })
  },
  methods:{

  }
}
</script>

<style scoped>

</style>