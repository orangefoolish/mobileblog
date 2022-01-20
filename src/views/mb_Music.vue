
<template>
<div style="background-color: white;width: 100%;height: 16vh;opacity: 1;overflow: hidden">
      <div style="background-color: rgb(212,62,53);width: 100%;height: 8vh;padding-top:calc(4vh)">
        <img src="@/assets/mb_resources/img/musicicon.png" style="display:inline-block;width: 30px;border: 0px solid;border-radius: 100%;margin-left: 3%">
        <span style="font-size: 25px;color: white;letter-spacing: 2px;padding-bottom: 5px;padding-left: 5px;position: relative;top:-7px;display: inline-block">🐕易云音乐</span>
      </div>
      <div style="display: flex;width: 100%;height: 3vh;flex-direction: row;border-bottom: 1px #d4d4d4 solid;padding-top: 1vh" >
        <span :class="this.selecttype[1]" @click="choose(1)">推荐音乐</span>
        <span :class="this.selecttype[2]" @click="choose(2)">热歌榜</span>
        <span :class="this.selecttype[3]" @click="choose(3)">搜索</span>
      </div>
      <div :style="'width:'+this.PlayerLength" style="transition:width 0.3s;margin-left:2%;position: absolute;top:75vh;border: 1px solid;background-color:white">
        <div  style="width:100%;height:100%;overflow: hidden">
          <img v-if="ifopen" src="@/assets/mb_resources/img/pre.png" @click="pre" style="width: 35px;position: absolute;margin-top: 3.2vh;margin-left: -1.5%">
          <marquee v-if="this.MusicList.length>0&&this.marqueetype==1" style="color: #c74848;width:100%;text-align: center;padding: 1%">{{ this.MusicList[this.CurrentMusic].name+"-"+this.MusicList[this.CurrentMusic].artists[0].name+"-"+this.MusicList[this.CurrentMusic].album.name }}</marquee>
          <marquee v-if="this.MusicList.length>0&&this.marqueetype==2" style="color: #c74848;width:100%;text-align: center;padding: 1%">{{ this.MusicList[this.CurrentMusic].name+"-"+this.MusicList[this.CurrentMusic].song.artists[0].name+"-"+this.MusicList[this.CurrentMusic].song.album.name }}</marquee>
          <marquee v-if="this.MusicList.length>0&&this.marqueetype==3" style="color: #c74848;width:100%;text-align: center;padding: 1%">{{ this.MusicList[this.CurrentMusic].al.name+"-"+this.MusicList[this.CurrentMusic].ar.name }}</marquee>
          <audio ref="audio" autoplay controls style="background-color: #c74848;width: 85%;margin-left:7.5%;margin-top: 2px " :src="MusicUrl" @play="play" @ended="next"></audio>
          <img v-if="ifopen" src="@/assets/mb_resources/img/next.png" @click="next" style="width: 35px;position: absolute;margin-top: 4px;margin-left: -5px">
          <img v-if="ifopen" @click="this.push(1)" src="@/assets/mb_resources/img/pull.png" style="width: 25px;position: absolute;margin-top: -55px;margin-left: 5px">
        </div>
        <img v-if="!this.ifopen" src="@/assets/img/music_icon.png" style="display: block;position: relative;top: -30px;left:3px;width: 18px" @click="this.push(1)">
      </div>
    </div>
    <template v-if="this.select==1" >
      <Mb_MusicMain @toplay="toplay"></Mb_MusicMain>
    </template>
    <template v-if="this.select==2">
      <Mb_MusicHot></Mb_MusicHot>
    </template>
    <template v-if="this.select==3">
      <Mb_MusicSearch @toplay="toplay"></Mb_MusicSearch>
    </template>

</template>

<script>
import global_variable from "./global_variable";
import Mb_MusicMain from "./mb_MusicMain";
import Mb_MusicHot from "./mb_MusicHot";
import Mb_MusicSearch from "./mb_MusicSearch";
import axios from "axios";
export default {
  name: "mb_Music",
  components: {
    Mb_MusicMain,
    Mb_MusicHot,
    Mb_MusicSearch
  },
  data(){
    return{
      selecttype:{1:"selected",2:"select",3:"select"},
      select:1,
      ifplay:false,
      PlayerLength:"0px",
      CageLength:"96%",
      MusicList:[],
      ifopen:false,//播放器是否打开
      CurrentMusic:-1,
      MusicUrl:'',
      MusicMessage:"",
      marqueetype: 0

    }
  },
  methods:{
    toplay(){
      this.CurrentMusic=global_variable.PlayId;
      this.MusicList=global_variable.musiclist;
      this.marqueetype=global_variable.marqueetype
      console.log(this.MusicList);
      console.log(this.CurrentMusic);
      this.push(0);
    },
    push(type) {
      if (this.MusicList.length!=0) {
        if(type==1){
          var temp = this.PlayerLength;
          this.PlayerLength = this.CageLength;
          this.CageLength = temp;
          this.ifopen=!this.ifopen;
          return;
        }
        this.play()
      }
      else{
        this.$message({
          type:"error",
          message:"请先选择歌曲"
        })
      }
    },
    next(){
      if(this.MusicList.length!=0){
        this.CurrentMusic=((this.CurrentMusic+1)%(this.MusicList.length));
        this.play();
      }
    },
    pre(){
      if(this.MusicList.length!=0){
        if(this.CurrentMusic==0){
          this.CurrentMusic=this.MusicList.length-1;
        }else{
          this.CurrentMusic-=1;
        }
        this.play();
      }
    },
    play(){
      if(global_variable.musiclist.length!=0){
        this.musicPlay(this.MusicList[this.CurrentMusic].id);
      }
      else{
        this.$message({
          type:"error",
          message:"请先选择歌曲"
        })
      }
    },
    musicPlay(musicId){

      axios.get("https://netease-cloud-music-api-six-roan.vercel.app/song/url?id="+musicId).then(
          res=>{
            this.MusicUrl=res.data.data[0].url;
          })
    },
    choose(id){
      for(var i=1;i<4;i++){
        if(i==id){
          if(this.selecttype[i]=="selected"){
            break;
          }else{
            this.selecttype[i]="selected";
            this.select=id;
            this.ifplay=global_variable.ifplay;
          }
        }else{
          this.selecttype[i]="select";
        }
      }
    }
  }
}
</script>

<style scoped>
div .select{
  flex: 1;
  text-align: center;
  display: inline-block;
  padding: 0px;
  margin: 0px;
}
div .selected{
  flex: 1;
  text-align: center;
  display: inline-block;
  padding: 0px;
  margin: 0;
  color:rgb(212,60,51) ;
  border-bottom: 1px solid;
}
</style>