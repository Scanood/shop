<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white shadow-md rounded-2xl mb-24">
      <el-form class="w-2/3">
        <el-form-item label="用户名：" label-width="120px">
          <el-input disabled v-model="me.username" />
        </el-form-item>
        <el-form-item label="邮箱：" label-width="120px">
          <el-input disabled v-model="me.email" />
        </el-form-item>
      </el-form>
      <el-form class="w-2/3" :model="psd" ref="psd">
        <el-form-item
          prop="oldPassword"
          label="原密码："
          label-width="120px"
          :rules="{
            required: true,
            message: '原密码不能为空！',
          }"
        >
          <el-input type="password" v-model="psd.oldPassword" show-password />
        </el-form-item>
        <el-form-item
          prop="newPassword"
          label="新密码："
          label-width="120px"
          :rules="{
            required: true,
            message: '新密码不能为空！',
          }"
        >
          <el-input type="password" v-model="psd.newPassword" show-password />
        </el-form-item>
        <el-form-item label-width="120px">
          <el-button type="primary" plain @click="changePassword"
            >更新</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ME } from "@/graphql/account/queries";
import { CHANGEPASSWORD } from "@/graphql/account/mutations";
export default {
  data() {
    return {
      me: {
        email: "",
        username: "",
      },
      psd: {
        oldPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    changePassword() {
      if (!this.$refs.psd) return;
      this.$refs.psd.validate((valid) => {
        if (valid) {
          const newPassword = this.psd.newPassword;
          const oldPassword = this.psd.oldPassword;
          this.$apollo
            .mutate({
              mutation: CHANGEPASSWORD,
              variables: {
                oldPassword: oldPassword,
                newPassword1: newPassword,
                newPassword2: newPassword,
              },
            })
            .then((res) => {
              if (res.data.passwordChange.success) {
                ElMessage({
                  message: "账户更新成功!",
                  type: "success",
                });
                localStorage.setItem(
                  "Authorization",
                  "JWT " + res.data.passwordChange.token
                );
              } else {
                ElMessage.error("账户更新失败！");
              }
            });
        }
      });
    },
  },
  apollo: {
    me: {
      query: ME,
    },
  },
};
</script>

<style>
</style>