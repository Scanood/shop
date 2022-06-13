<template>
  <div>
    <el-dropdown>
      <el-avatar
        src="https://q1.qlogo.cn/g?b=qq&nk=1498580056&src_uin=www.jlwz.cn&s=0"
      ></el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="this.$router.push('/dashboard/account')"
            >账户设置</el-dropdown-item
          >
          <el-dropdown-item @click="dialogVisible = true"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog v-model="dialogVisible" title="系统提示：" width="30%">
      <span>确定要退出系统吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="logout">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("Authorization");
      this.$router.push("/");
    },
  },
};
</script>
