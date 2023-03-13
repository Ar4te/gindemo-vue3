<template>
  <div class="container">
    <div class="login">
      <div class="item">
        <h2>Welcome</h2>
      </div>
      <div class="item">
        <span>账号：</span>
        <div>
          <el-input v-model="loginForm.telephone" placeholder="Please input" />
        </div>
      </div>
      <div class="item">
        <span>账号：</span>
        <div>
          <el-input v-model="loginForm.password" type="password" placeholder="Please input" />
        </div>
      </div>
      <div class="item">
        <span>记住我：</span>
        <div>
          <el-checkbox v-model="isRemember" size="large" />
        </div>
        <div class="repwdBtn">
          <el-button size="mini" style="background: transparent;color: yellow;border: none"
            @click="RePwd">忘记密码</el-button>
        </div>
      </div>
      <div class="item">
        <div class="btn">
          <el-button size="mini">Cancel</el-button>
          <el-button type="primary" @click="Login" size="mini">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { login, rePwd } from '@/api/login';
import { ElMessage } from 'element-plus';
import store from "@/store/index";
import { useRouter } from "vue-router";

const isRemember = ref(false);
const loginForm = reactive({
  telephone: '',
  password: '',
});

const router = useRouter();

let formdata = new FormData();

// 登录
const Login = async () => {
  formdata = new FormData();
  formdata.append('telephone', loginForm.telephone);
  formdata.append('password', loginForm.password);
  const res = await login(formdata);
  if (res && res.code && res.code === 200) {
    ElMessage.success(res.msg);
    if (res.data) {
      store.commit('changeLogin', { Authorization: res.data['token'] });
    }
    // 页面跳转
    router.push({
      path: '/layout',
      query: {
        abc: '111',
      },
    });
  } else {
    ElMessage.error(res.msg);
  }
};

// 修改密码
const RePwd = async () => {
  formdata = new FormData();
  formdata.append('newPwd', '1234567');
  const data = await rePwd(formdata);
  if (data && data.code && data.code === 200) {
    ElMessage.success(data.msg);
  } else {
    ElMessage.error(data.msg);
  }
}
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, rgb(19, 19, 39), lightblue);
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 400px;
    border: 1px solid #eee;
    border-radius: 8px;
    color: #eee;
    padding: 10px;

    .item {
      display: flex;
      margin: 10px 0;
      align-items: center;
      font-size: 14px;

      h2 {
        flex: 1;
        text-align: center;
      }

      span {
        width: 60px;
        text-align: right;
      }

      div {
        flex: 1;
      }

      .btn {
        flex: 1;
        text-align: center;
      }

      .repwdBtn {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
