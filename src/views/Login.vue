<template>
  <div style="width: 100%;height: 100vh;overflow: hidden ">
    <div>
      <img src="@/assets/img/back.png" @click="back" style="margin-top: 20px;margin-left:20px;width: 40px;cursor: pointer" title="返回博客">
    </div>
    <div style="margin: 0 auto;font-family:微软雅黑;margin-top: 150px;width: 400px;height:250px;box-shadow:0px 0px 10px black ">
      <div style="color: white;font-size: 30px;font-weight: 600;text-align: center;margin-bottom: 30px">
        欢迎登录
      </div>
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="账号" style="--el-form-label-font-size: 20px;width:90%">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="--el-form-label-font-size: 20px;width:90%">
          <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button style="margin-right: 55px;width: 80px" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import request from "@/utils/request";
import global_variable from "@/views/global_variable";
export default {
  name: "login",
  data() {
    return {
      form:{}
    }
  },

  methods:{
    back(){
      if(global_variable.ismobile){
        this.$router.push("/home")
      }else{
        this.$router.push('/')
      }

    },
    login(){
      request.post("/api/login",JSON.stringify(this.form)).then(res=>{
        if(res.code=="200"){
          localStorage.setItem("token",res.data);
          this.$message({
            type:"success",
            message:"登录成功",
          })
          this.$router.push("/admin")
        }
        else if(res.code=="400") {
          this.$message({
            type:"error",
            message:"账号或密码错误",
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>