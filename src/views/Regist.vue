<template>
  <el-dialog v-model="dialogVisible" title="欢迎~" width="20%" draggable :show-close='false' :close-on-click-modal='false'>
    <el-radio-group v-model="operate">
      <el-radio-button label="isLogin">登录</el-radio-button>
      <el-radio-button disabled label="!isLogin">注册</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px 0; width: 100%;"></div>
    <el-form label-postion="right" label-width="100px" :model="loginForm" style="max-width: 460px;">
      <el-form-item label="手机号：">
        <el-input v-model="loginForm.telephone" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="Password" v-model="loginForm.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class=" dialog-footer">
        <el-button @click="registerClose">Cancel</el-button>
        <el-button type="primary" @click="Submit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, toRefs } from 'vue';
import { login, rePwd } from '@/api/login';
import { ElMessage } from 'element-plus';
import store from "@/store/index";

const props = defineProps({
  dialogVisible: Boolean,
  info: String,
});

const { dialogVisible } = toRefs(props);

let operate = ref('isLogin');
//关闭弹窗
const emit = defineEmits(['registerClose']);
const registerClose = () => {
  let param = {
    dialogVisible: false,
  };
  emit('registerClose', param);
};

const loginForm = reactive({
  telephone: '',
  password: '',
});

let formdata = new FormData();

const Submit = () => {
  if (operate.value === 'isLogin') {
    Login();
  }
}

// 登录
const Login = async () => {
  console.log('execute Login operator');
  formdata = new FormData();
  formdata.append('telephone', loginForm.telephone);
  formdata.append('password', loginForm.password);
  const res = await login(formdata);
  if (res && res.code && res.code === 200) {
    ElMessage.success(res.msg);
    if (res.data) {
      store.commit('changeLogin', { Authorization: res.data['token'] });
    }
    registerClose();
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
