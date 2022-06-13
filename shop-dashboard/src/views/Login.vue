<template>
  <div class="login" v-loading="this.$apollo.loading">
    <div
      class="
        w-fit
        flex flex-col
        justify-center
        p-10
        bg-white
        rounded-xl
        shadow-lg
        opacity-95
      "
    >
      <el-form
        label-position="right"
        label-width="100px"
        :rules="rules"
        style="width: 400px"
        ref="formRef"
        :model="form"
      >
        <div class="font-semibold font-serif text-center text-xl mb-5">
          欢迎使用商城后台管理系统
        </div>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            show-password
            v-model="form.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="w-fit m-auto">
        <el-button type="primary" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { StaffLogin } from "../graphql/login/mutations";
export default {
  name: "LogIn",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入您的邮箱",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入您的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleLoginRequest() {
      this.$apollo
        .mutate({
          mutation: StaffLogin,
          variables: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        .then((res) => {
          if (res.data.tokenAuth.success && res.data.tokenAuth.user.isStaff) {
            ElNotification({
              title: "温馨提示：",
              message: "系统登录成功。",
              type: "success",
            });
            localStorage.setItem(
              "Authorization",
              "JWT " + res.data.tokenAuth.token
            );
            this.$router.push("/dashboard/");
          } else {
            ElMessage.error("登录失败，用户名或密码不正确。");
          }
        })
        .catch(() => {
          ElMessage({
            message: "系统错误或网络未连接。",
            type: "warning",
          });
        });
    },
    login() {
      if (!this.$refs.formRef) return;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.handleLoginRequest();
        } else {
          ElMessage.error("用户名或密码格式不正确！");
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  background-image: url("/login.png");
  width: 100%;
  height: 100vh;
  @apply flex flex-col items-center justify-center;
}
</style>