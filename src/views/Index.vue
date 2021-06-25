<template>
  <div class="index">
    <el-button @click="logout" type="danger">退出登录</el-button>
    <el-button @click="queryAll" >查询所有账号信息</el-button>
    <el-button @click="querySelf" >查询本账号信息</el-button>
  <div>当前用户身份：{{$store.state.userinfo.usertype}}</div>
  <el-table
      :data="query"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="is_superuser"
        label="是否管理员">
      </el-table-column>
      <el-table-column
        prop="date_joined"
        label="注册日期">
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="上次登录">
      </el-table-column>
    </el-table>
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
    },
    async queryAll() {
      const resjson = await fetch('/api/query?action=queryAll', { credentials: 'include' }).then(res => res.json());
      console.log(resjson);
      if (resjson.ret === 0) {
        this.query = resjson.data.map(e => {
          return {
            ...e,
            is_superuser: e.is_superuser? '管理员':'平民',
            email: e.email ? e.email : '未填写',
          }
        });
      } else {
        this.$message.error(resjson.msg);
      }
    },
    async querySelf() {
      const resjson = await fetch('/api/query?action=querySelf', { credentials: 'include' }).then(res => res.json());
      console.log(resjson);
      if (resjson.ret === 0) {
         this.query = resjson.data.map(e => {
          return {
            ...e,
            is_superuser: e.is_superuser? '管理员':'平民',
            email: e.email ? e.email : '未填写',
          }
        });
      } else {
        this.$message.error(resjson.msg);
      }
    },
  }
}
</script>
