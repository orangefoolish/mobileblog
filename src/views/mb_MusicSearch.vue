<template>
  <div v-if="!this.isinsearch" style="width: 100%;height: 85vh;background-color: white">
    <img src="@/assets/mb_resources/img/search.png" @click="searchMusic(this.input)" style="width: 6%;position: absolute;z-index: 1;margin-top: 4%;margin-left: 90%">
    <el-input type="text" v-model="input" style="width: 96%;margin: 2%;border: 0 solid;border-radius: 5%;" v-text="input" placeholder="输入歌曲、歌手、专辑">
    </el-input>
    <div style="font-size:13px;color: #60686a;padding: 2%">
      <p style="padding-bottom: 10px">热门搜索</p>
      <ul style="font-size: 15px">
        <li v-for="item in hots" @click="searchMusic(item.first)" style="display: inline-block;padding: 2.5%;text-align: center;margin-top:1%;margin-right:1%;border: 1px solid;border-radius: 20px">
          {{ item.first }}</li>
      </ul>
    </div>
  </div>
  <div v-if="isinsearch" style="width: 100%;height: 85vh;background-color: white;overflow-y: scroll">
    <ul>
      <li v-for="(item,index) in musiclist" style="padding: 2%" @click="toplay(index)">
        <p style="font-size: 18px">{{item.name}}</p>
        <img v-if="item.id%7!=1" style="display:inline-block;width: 10px;padding-right: 5px" src="@/assets/mb_resources/img/sq.png"><p style="display:inline-block;font-size: 11px;color: rgb(136,136,136);padding-top: 4px">{{item.artists[0].name}}-{{item.album.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import request from "../utils/request";
import global_variable from "./global_variable";
import axios from "axios";

export default {
  name: "mb_Music_Search",
  mounted() {
    this.$nextTick(function(){
      global_variable.ifplay=true;
        this.gethot()
    })
  },
  data(){
    return{
      input:"",
      hots:[],
      musiclist:[],
      isinsearch:false,
    }
  },
  methods:{
    toplay(index){
      global_variable.PlayId=index;
      global_variable.marqueetype=1;
      this.$emit("toplay");
    },
    searchMusic(input){
      if(!input){
        this.$message({
          type:"warning",
          message:"请输入要搜索的歌曲！",
        })
      }else{
        axios.get("https://netease-cloud-music-api-six-roan.vercel.app/search?keywords="+input).then(
            res=>{
              this.musiclist=res.data.result.songs;
              global_variable.musiclist=this.musiclist;
              this.isinsearch=!this.isinsearch;
            }
        )
      }
    },
    gethot(){
      axios.get("https://netease-cloud-music-api-six-roan.vercel.app/search/hot").then(res=>{
        this.hots=res.data.result.hots;
      })
    }
  }
}
</script>

<style scoped>

</style>