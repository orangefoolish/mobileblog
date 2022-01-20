<template>
  <div v-if="!intoAlbum" style="width: 100%;height: 85vh;background-color: white;overflow-y: scroll;">
    <div>
      <p style="padding: 3%">🐕哥推荐</p>
      <ul>
        <li v-for="album in hotAlbums" style="display:inline-block;width: 31%;padding: 1%" @click="getplaylist(album.id)"><img :src="album.picUrl" style="width: 100%;display: inline-block"><span style="font-size:13px;overflow: hidden;display: inline-block;font-weight: 100;padding: 4%;text-overflow:ellipsis;max-height: 2.7vh;overflow:hidden " v-text='album.name'></span></li>
      </ul>
    </div>
    <div>
      <p style="padding: 3%;margin-top: 3vh">最新音乐</p>
      <ul>
        <li v-for="(item,index) in newsongs" style="padding: 3%" @click="toplay(index,1)">
          <p style="font-size: 18px">{{item.name}} <span style="color:rgb(136,136,136);">{{item.song.alias[0]}}</span></p>
          <p style="display:inline-block;font-size: 11px;color: rgb(136,136,136);padding-top: 4px">
            <img style="display:inline-block;width: 10px;padding-right: 5px" src="@/assets/mb_resources/img/sq.png">
            {{item.song.artists[0].name}}-{{item.song.album.name}}
          </p>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="this.intoAlbum" style="background-color: white">
    <div style="width: 100%;height: 20vh;background-image: linear-gradient(45deg,#595151, #9d8f90);;padding-top: 10%;padding-left: 5%">
      <img :src="playList.coverImgUrl" style="width: 35%">
      <img src="@/assets/mb_resources/img/playlist.png" style="width: 30px;position: absolute;left: 5%">
      <p v-text="playList.name" style="position: absolute;left: 44%;top: 22vh;width: 55%;color: white;font-size: 20px;height: 44px"></p>
      <img :src="this.playList.creator.avatarUrl" style="position: absolute;left: 44%;top: calc(22vh + 44px);width: 40px;border: 0px solid;border-radius: 50%">
      <span v-text="this.playList.creator.nickname" style="position: absolute;color:white;left: calc(44% + 40px);top: calc(22vh + 60px);"></span>
      <div style="position: absolute;font-weight: 50;left: 44%;top: calc(22vh + 95px)"><img src="@/assets/mb_resources/img/counticon.png" style="width: 15px;padding-right:2px">
        <span v-text="playList.playCount"></span>
      </div>

    </div>
    <p style="padding: 2%;font-size: 12px;background-color: gainsboro">歌曲列表</p>
    <div style="height: 57vh;overflow-y: scroll">
      <li v-for="(item,index) in playList.tracks" style="padding: 3%;display: flex" @click="toplay(index,2)">
        <div style="flex: 1;padding-top: 1vh;color: #8d8d8d">{{index+1}}</div>
        <div style="flex: 15">
          <p style="font-size: 18px">{{item.name}}</p>
          <p style="display:inline-block;font-size: 11px;color: rgb(136,136,136);padding-top: 4px">{{item.ar[0].name}}-{{item.al.name}}</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import global_variable from "./global_variable";
import axios from "axios";

export default {
  name: "mb_Music_Main",
  mounted() {
    this.$nextTick(function (){
      this.gethotAlbums();
      this.getsongs()
    })
  },
  data(){
    return{
      hotAlbums:[],
      newsongs:[],
      intoAlbum:false,
      playList:[],
    }
  },
  methods:{
    gethotAlbums(){
      axios.get("https://netease-cloud-music-api-six-roan.vercel.app/personalized?limit=6").then(res=>{
        this.hotAlbums=res.data.result;
        this.intoAlbum=this.false;
      })
    },
    getsongs(){
      axios.get("https://autumnfish.cn/personalized/newsong").then(res=>{
        this.newsongs=res.data.result;
      })
    },
    toplay(index,type){
      if(type==1){
        global_variable.musiclist=this.newsongs;
        global_variable.marqueetype=2;
      }else{
        global_variable.musiclist=this.playList.tracks;
        global_variable.marqueetype=3;
      }
      console.log(global_variable.musiclist)
      global_variable.PlayId=index;
      this.$emit("toplay");
    },
    getplaylist(playlistid){
      axios.get("https://netease-cloud-music-api-six-roan.vercel.app/playlist/detail?id="+playlistid).then(res=>{
        this.playList=res.data.playlist;
        this.intoAlbum=!this.intoAlbum;
      })
    }
  }
}
</script>

<style scoped>

</style>