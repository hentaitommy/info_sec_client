<template>
  <div class="index">
    <el-button @click="logout" type="danger">退出登录</el-button>
  <div>当前用户身份：{{$store.state.userinfo.usertype}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: []
    };
  },
  methods: {
    logout() {
      fetch('/api/signout', { credentials: 'include' });
      this.$router.push({name: 'Login'});
      this.$store.dispatch('checkLogin');
    }
  }
}
</script>
