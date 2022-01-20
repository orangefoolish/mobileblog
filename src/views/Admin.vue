<template>
  <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>狗管理香蕉君</span>
        </div>
      </template>
    <el-button  style="position: absolute;right: 70%" @click="Add">新增</el-button>
    <el-button  style="position: absolute;right:52%" @click="logout">登出</el-button>
    <el-button style="position: absolute;right: 34%" @click="messagedialogview">格言</el-button>
      <el-input
          v-model="search"
          placeholder="请输入"
          prefix-icon="el-icon-search"
          style="width: 30%;margin-left: 70%"
          @keydown.enter="load"
      />
      <div>
          <el-table :data="form" style="width: 100%">
            <el-table-column fixed prop="date" label="日期" width="250" />
            <el-table-column prop="title" label="标题" width="250" />
            <el-table-column prop="id" label="ID" width="250" />
            <el-table-column prop="text" label="内容" width="500" />
            <el-table-column fixed="right" label="Operations" width="150">
              <template #default="scope">
                <el-button  size="small" style="margin-left: 10px;margin-bottom: 5px" @click="Update(scope.row)"
                >编辑</el-button
                >
                <el-popconfirm title="确定删除吗" @confirm="Delete(scope.row)">
                  <template #reference>
                    <el-button size="mini" type="danger" style="background-color: red">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination layout="prev, pager, next" :total="total" :page-size="6"  @current-change="handleCurrentChange"></el-pagination>
      </div>
    </el-card>
  <el-dialog title="提示" v-model="dialogVisible" width="70%" >
    <el-form :model="editdata" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="editdata.title" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-if="!editdata.id" style=";color: black;width: 80%" :placeholder="this.updateTime" disabled>{{this.updateTime}}</el-input>
        <el-input v-if="editdata.id" v-model="editdata.date" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="Tag">
        <el-input v-model="editdata.tag" style="width: 80%"></el-input>
      </el-form-item>
      <div id="div1" style="margin-bottom: 10px"></div>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="this.dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="Edit">确 定</el-button>
        </span>
  </el-dialog>
  <el-dialog title="提示" v-model="this.messagediaglog" width="70%" >
    <el-input v-model="this.message"></el-input>
    <span slot="footer" class="dialog-footer">
          <el-button style="margin: 10px" @click="this.messagedialogview">取 消</el-button>
          <el-button style="margin: 10px" type="primary" @click="messagesubmit">确 定</el-button>
        </span>
  </el-dialog>
  </template>

  <script>
    import request from "@/utils/request";
    import "@/assets/css/admin.css"
    import E from 'wangeditor'
    import global_variable from "./global_variable";
    let editor;
    export default {
      name: "Admin",
      data(){
        return{
          dialogVisible:false,
          currentPage:1,
          total:100,
          form:[],
          updateTime:"",
          editdata:{},
          title:"",
          search:"",
          messagediaglog:false,
          message:'',
        }
      },
      mounted:function()
      {
        this.$nextTick(function(){
          this.iflogin();
          this.load();
          this.addDate()
          //调用需要执行的方法
        })
      }
      ,
      methods:{
        createEditor(){
          if(!editor){
            this.$nextTick(()=>{
              editor = new E('#div1')
              editor.create()
              editor.txt.html(this.editdata.text)
            })
          }else{
            if(this.editdata.id){
              editor.txt.html(this.editdata.text)
            }else{
              editor.txt.html("");
            }
          }
        },
        messagedialogview(){
          this.messagediaglog=!this.messagediaglog;

        },
        messagesubmit(){
          this.messagediaglog=false;
          global_variable.message=this.message;
          this.$message({
            type: "success",
            message: "修改成功",
          })
        }
        ,
        iflogin() {
          if (!localStorage.getItem("token")) {
            this.$router.push("/login");
          }
        },
        logout(){
          localStorage.removeItem('token')
          this.$router.push("/login")
        },
        load(){
          request.get("/api/user",{params:{"pageNum":this.currentPage,"pageSize":6,"search":this.search}}).then(
              res=>{
                this.form=res.data.records;
                this.total=res.data.total
              }
          )
        },
        handleCurrentChange(pageNum){
          this.currentPage=pageNum;
          request.get("/api/user",{params:{"pageNum":this.currentPage,"pageSize":6}}).then(
              res=>{
                this.form=res.data.records;
                this.load();
              }
          )
        },
        Update(row){
          this.editdata=JSON.parse(JSON.stringify(row));
          this.dialogVisible=true;
          this.createEditor()


        },
        Add(){
          this.dialogVisible=true;
          this.editdata={};
          this.createEditor();
        },
        Edit(){
          if(this.editdata.id){
            if(this.isBlank()){
              this.$message({
                type:"warning",
                message:"输入信息存在空值！",
              })
            }
            else {
              request.post("/api/user/edit", JSON.stringify(this.editdata)).then(res => {
                this.CheckToken(res);
                this.load();
                this.editdata = {};
                if (res.code == "200") {
                  this.dialogVisible = false;
                  this.$message({
                    type: "success",
                    message: "修改成功",
                  })
                } else {
                  this.$message({
                    type: "error",
                    message: res.msg
                  })
                }
              });
            }
          }
          else{
            if(this.isBlank()){
              this.$message({
                type:"warning",
                message:"输入信息存在空值！",
              })
            }
            else{
              this.editdata.date=this.updateTime;
              request.post("/api/user/insert",JSON.stringify(this.editdata)).then(res=>{
                this.CheckToken(res);
                if(res.code=="200"){
                  this.dialogVisible=false;
                  this.$message({
                    type:"success",
                    message:"新增成功",
                  })
                }
                else {
                  this.$message({
                    type:"error",
                    message:res.msg
                  })
                }
                this.load();
              });
            }
          }
        },
        CheckToken(res){
          if(res.code=="300"){
            this.logout();
          }
        },
        Delete(List){
          request.delete("/api/user/delete/"+List.id).then(res=>{
            this.CheckToken(res);
            this.load();
            if(res.code=="200"){
              this.dialogVisible=false;
              this.$message({
                type:"success",
                message:"删除成功",
              })
            }
            else {
              this.$message({
                type:"error",
                message:res.msg
              })
            }
          })
        },
        isBlank(){
          this.editdata.text=editor.txt.html();
          if(!this.editdata.title || !this.editdata.text||!this.editdata.tag ){
              return true;
          }else{
            if(this.editdata.id){
              if(!this.editdata.date) {
                return true;
              }
              return false;
            }else{
              return false;
            }
          }
        },
        addDate(){
          const nowDate = new Date();
          const date = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth() + 1,
            date: nowDate.getDate(),
          }
          const newmonth = date.month>=10?date.month:'0'+date.month;
          const day = date.date>=10?date.date:'0'+date.date
          this.updateTime = date.year + '-' + newmonth + '-' + day
        },
      }
      }
  </script>

  <style scoped>

  </style>
