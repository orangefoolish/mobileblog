<template>
    <div style="overflow:scroll;height:78vh">
      <div @click="this.toArticle" style="overflow-y: scroll;width: 94%;border: 1px solid;z-index:0;;margin:3%;margin-top:3vh;background-color: white;padding-top: 2vh">
        <p style="font-size: 1rem;font-weight: 1000;position:relative;text-align: center;border-bottom: 1px solid;padding-bottom: 2vh">{{this.article.title}}</p>
        <p style="font-size: 1rem;font-weight: 1000;position:relative;text-align: left;padding: 1rem" v-html="this.article.text"></p>
      </div>
      <p style="font-size: 1.5rem;padding: 1rem;padding-top: 0rem;color: white">评论区 &nbsp; <el-button style="height: 10px" @click="this.tocomment">评论</el-button></p>
      <div style="overflow-y: scroll;overflow-y: scroll">
        <div v-for="(item,id) in comments" style="width: 94%;z-index:0;background-color: white;margin-left: 3%">
          <span style=";display:inline-block;font-size: 16px;font-weight: 600;margin-left:10px;margin-top: 10px">{{id+1}} 楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: black;font-size: 16px;font-weight: 700">评论者: {{item.commentername}}</span> <span style="font-weight: 700;color: #635f5f">{{item.commenterName}}</span></span>
          <p style="font-size: 20px;font-family: 微软雅黑;margin: 20px">{{item.comment}}</p>
          <span style="font-size: 13px;font-weight: 600;margin-left:10px;color: gray">{{item.date}}</span>
          <el-divider></el-divider>
        </div>
      </div>

      <div v-if="comments.length==0" style="width: 78%;border: 1px solid;z-index:0;margin:3%;padding: 2rem;margin-top:3vh;background-color: white;">
        很遗憾，暂时还没有评论
      </div>
      <div v-if="ifcomment" style="width: 100%;height: 100%;background-color:rgba(0,0,0,0.3);z-index: 2;opacity: 1;position: absolute;top: 0px">
        <div  style="width: 96%;position:absolute;top: 20%;;margin-left: 2%;margin-bottom: 50px">
          <el-input style="width: 35%;margin-bottom: 10px" placeholder="输入你的带名" v-model="commentername"></el-input>
          <el-input style="margin-bottom: 10px" v-model="comment" type="textarea" :rows="10" placeholder="输入你的评论"></el-input>
          <el-popconfirm title="确定重置评论吗?" @confirm="clear()">
            <template #reference>
              <el-button >重置</el-button>
            </template>
          </el-popconfirm>
          <el-button @click="commit">提交</el-button>
          <el-button @click="this.tocomment">取消</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import "@/assets/mb_resources/css/ToArtivle.css"
import request from "@/utils/request";
import global_variable from "@/views/global_variable";
export default {
  name: "ToArticle",
  data() {
    return {
      article: {},
      comments:[],
      ifcomment: false,
      newcomment:{},
      commentername:'',
      comment:'',
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getArticle();
      this.getComment(global_variable.articleId)
    })
  },
  methods: {
    tocomment() {
      this.ifcomment = !this.ifcomment;
    },
    getArticle() {
      request.get("/api/user/" + global_variable.articleId).then(
          res => {
            this.article = res.data;
          }
      )
    },
    getComment(id) {
      request.get("/api/comment/" + id).then(
          res => {
            this.comments = res.data;
          }
      )
    },
    commit() {
      this.newcomment.commentername = this.commentername;
      this.newcomment.comment = this.comment;
      if (!this.isEmpty()) {
        this.newcomment.blogid = global_variable.articleId;
        this.addDate();
        console.log(this.newcomment)
        request.post("/api/comment", JSON.stringify(this.newcomment)).then(
            res => {
              if (res.code == "200") {
                this.dialogVisible = false;
                this.$message({
                  type: "success",
                  message: "评论成功",
                })
                this.comment = "";
                this.commentername = "";
                this.getComment(global_variable.articleId);
                this.tocomment();
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
            })
      }
    },
    clear() {
      this.newcomment = "";
      this.commentername="";
      this.comment="";
    },
    isEmpty() {
      if (this.newcomment.commentername.length === 0 || this.newcomment.comment.length == 0) {
        this.$message({
          type: "error",
          message: "输入存在空值！"
        })
        return true;
      }
      return false;
    },
    addDate() {
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      const newmonth = date.month >= 10 ? date.month : '0' + date.month;
      const day = date.date >= 10 ? date.date : '0' + date.date
      this.newcomment.date = date.year + '-' + newmonth + '-' + day
    },
  }
}
</script>

<style scoped>
body{
  height: 100%;
  overflow-y: scroll;
}
</style>