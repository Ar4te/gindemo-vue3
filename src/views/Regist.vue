<template>
  <el-dialog v-model="dialogVisible" title="欢迎~" width="20%" draggable :show-close='false' :close-on-click-modal='false'>
    <div style="margin: 20px 0; width: 100%;"></div>
    <el-form :ref="dataFormRef" :rules="rule" label-postion="right" label-width="100px" :model="dataForm"
      style="max-width: 460px;">
      <el-form-item v-if="operate === 'login'" label="手机号：">
        <el-input v-model="dataForm.telephone" clearable />
      </el-form-item>
      <el-form-item v-if="operate === 'login'" label="密码：">
        <el-input type="Password" v-model="dataForm.password" clearable show-password />
      </el-form-item>
      <el-form-item v-if="operate === 'repwd'" label="新密码：">
        <el-input type="Password" v-model="dataForm.newPwd" clearable show-password />
      </el-form-item>
      <el-form-item v-if="operate === 'repwd'" label="确认密码：">
        <el-input type="Password" v-model="dataForm.confirmNewPwd" clearable show-password />
      </el-form-item>
      <el-form-item>
        <el-button @click="registerClose">Cancel</el-button>
        <el-button type="primary" @click="Submit(dataFormRef)">
          Confirm
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, toRefs } from 'vue';
import { login, rePwd } from '@/api/login';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import store from "@/store/index";

const props = defineProps({
  dialogVisible: Boolean,
  info: String,
  operate: String,
});

const { dialogVisible, operate } = toRefs(props);
let isLogined = ref(false);
//关闭弹窗
const emit = defineEmits(['registerClose', 'isLogined']);
const registerClose = () => {
  let params = {
    dialogVisible: false,
    isLogined: isLogined.value,
  };
  emit('registerClose', params);
};

const dataForm = reactive({
  telephone: '',
  password: '',
  newPwd: '',
  confirmNewPwd: '',
});

// 表单校验
const dataFormRef = ref<FormInstance>();
const loginRules = reactive<FormRules>({
  telephone: [
    { required: true, message: 'Please input telephone number', trigger: 'blur' },
    { min: 11, max: 11, message: 'Length must be 11', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
  ],
});

const validatePass = () => {
  return (_rule: any, value: any, callback: any) => {
    if (value !== dataForm.newPwd) {
      callback(new Error('两次输入密码不一致'));
    } else {
      callback();
    }
  }
};

const repwdRules = reactive<FormRules>({
  newPwd: [
    { required: true, message: 'Please input new password', trigger: 'blur' },
    { min: 7, message: 'Length should bigger than 11', trigger: 'blur' },
  ],
  confirmNewPwd: [
    {
      required: true, validator: validatePass(), trigger: 'blur',
    },
    { min: 7, message: 'Length should bigger than 11', trigger: 'blur' },
  ],
});

let rule = operate?.value === 'login' ? loginRules : repwdRules;
console.log(rule);

let formdata = new FormData();

const Submit = async (dataFormRef: any) => {
  // if (!dataFormRef) {
  //   return;
  // }
  // await dataFormRef.validate((valid: any, fields: any) => {
  //   if (valid) {
  if (operate?.value === 'login') {
    Login();
  } else if (operate?.value === 'repwd') {
    RePwd();
  }
  //   } else {
  //     console.log('error submit!', fields);
  //   }
  // })
};

// 登录
const Login = async () => {
  formdata = new FormData();
  formdata.append('telephone', dataForm.telephone);
  formdata.append('password', dataForm.password);
  const res = await login(formdata);
  if (res && res.code && res.code === 200) {
    ElMessage.success(res.msg);
    if (res.data) {
      store.commit('changeLogin', { Authorization: res.data['token'] });
    }
    isLogined.value = true;
    registerClose();
  } else {
    ElMessage.error(res.msg);
  }
};

// 修改密码
const RePwd = async () => {
  isLogined.value = true;
  if (dataForm.newPwd !== dataForm.confirmNewPwd) {
    ElMessage.error('两次输入密码不一致！');
  }
  formdata = new FormData();
  formdata.append('newPwd', dataForm.newPwd);
  const data = await rePwd(formdata);
  if (data && data.code && data.code === 200) {
    ElMessage.success(data.msg);
    isLogined.value = false;
    registerClose();
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
