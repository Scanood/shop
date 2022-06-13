<template>
  <div>
    <el-tooltip effect="dark" content="删除账户信息" placement="top">
      <el-button type="danger" circle @click="deleteAccount">
        <el-icon> <Delete /></el-icon>
      </el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="重置账户密码" placement="top">
      <el-button type="primary" circle @click="passwordRestVisible = true">
        <el-icon> <Edit /></el-icon>
      </el-button>
    </el-tooltip>
    <el-dialog v-model="passwordRestVisible" title="重置密码" width="30%">
      <el-form ref="form" :model="psd">
        <el-form-item
          prop="newPassWord"
          label="新密码："
          :rules="{
            required: true,
            message: '新密码不能为空！',
            trigger: 'change',
          }"
        >
          <el-input
            v-model="psd.newPassWord"
            placeholder="请输入新密码"
            type="password"
            show-password
          />
        </el-form-item>
        <div class="flex flex-row justify-evenly">
          <el-button @click="passwordRestVisible = false">取消</el-button>
          <el-button type="primary" @click="resetPassWord">修改</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Edit, Delete } from "@element-plus/icons-vue";
import { STAFFPASSWORDRESET, STAFFDELETEUSER } from "@/graphql/user/mutations";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      passwordRestVisible: false,
      psd: { newPassWord: null },
    };
  },
  components: {
    Delete,
    Edit,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    resetPassWord() {
      const form = this.$refs.form;
      if (!form) return;
      form.validate((valid) => {
        if (!valid) return;
        const token = this.token;
        const newPassWord = this.psd.newPassWord;
        this.$apollo
          .mutate({
            mutation: STAFFPASSWORDRESET,
            variables: {
              token,
              newPassWord,
            },
          })
          .then((res) => {
            if (res.data.PassWordResetWithToken.success) {
              this.passwordRestVisible = false;
              this.$refs.form.resetFields();
              ElMessage({
                message: "密码重置成功！",
                type: "success",
              });
            }
          });
      });
    },

    deleteAccount() {
      ElMessageBox.confirm("确定要删除当前用户吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const token = this.token;
          this.$apollo
            .mutate({
              mutation: STAFFDELETEUSER,
              variables: {
                token,
              },
            })
            .then((res) => {
              if (res.data.AccountDeleteWithToken.success) {
                ElMessage({
                  type: "success",
                  message: "账户删除成功！",
                });
                this.$router.push("/dashboard/user/");
              }
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>