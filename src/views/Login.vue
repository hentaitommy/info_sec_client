<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-input v-model="username" placeholder="请输入账号"></el-input>
    <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
    <el-row>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="reset">重置</el-button>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    reset() {
      this.username = '';
      this.password = '';
    },
    login() {
      fetch('api/signin',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
           "content-type": "application/json" 
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        })
      }).then((res)=>{
        console.log(res);
      })
    }
  }
}
</script>
