<template>
  <div class="container">
    <div class="left" :style="{ width: !leftMenuOpen ? '65px' : '200px', background: currentThemeColor }">
      <div class="logo">
        <div>Bing</div>
      </div>
      <el-menu active-text-color="#ffd04b" :background-color="currentThemeColor" class="el-menu-vertical-demo"
        default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="!leftMenuOpen"
        style="height: 100%;">
        <el-sub-menu index="1-1">
          <template #title>
            <el-icon>
              <House />
            </el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="1-1">角色管理</el-menu-item>
          <el-menu-item index="1-2">账户管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <add-location />
            </el-icon>
            <span>客房管理</span>
          </template>
          <el-menu-item index="2-1">类型管理</el-menu-item>
          <el-menu-item index="2-2">客房管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <briefcase />
            </el-icon>
            <span>顾客管理</span>
          </template>
          <el-menu-item index="3-1">顾客管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <cpu />
            </el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="4-1">权限管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right">
      <div class="top" :style="{ background: currentThemeColor }">
        <div class="icon" @click="leftMenuOpen = !leftMenuOpen">
          <el-icon size="30px">
            <fold />
          </el-icon>
        </div>
        <div class="item">
          <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal"
            :background-color="currentThemeColor" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="1">
              <el-icon>
                <HomeFilled />
              </el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <Message />
              </el-icon>
              邮件
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <ChatDotSquare />
              </el-icon>
              消息
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <baseball />
                </el-icon>
                切换皮肤
              </template>
              <el-menu-item @click="changeThemeColor(index)" :index="'4-' + index" v-for="item, index in getColorNames">{{
                item
              }}</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-avatar :src=avatarPicStr />
              </template>
              <el-menu-item index="5-1">个人中心</el-menu-item>
              <el-menu-item index="5-2">修改密码</el-menu-item>
              <el-menu-item index="5-3">退出系统</el-menu-item>
              <el-menu-item index="5-4" @click="handleLogin(isLogined)">{{ isLogined ? '切换账号' : '登录/注册' }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="bottom">3</div>
    </div>
  </div>

  <div class="register">
    <Regist :dialogVisible="dialogVisible" @registerClose='registerClose' />
  </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import conster from "@/config/conster";
import Regist from '@/views/Regist.vue'

//头像
const avatarPicStr = conster.avatarPicStr ? conster.avatarPicStr : '';

const route = useRoute();

let isLogined = ref(false);

let dialogVisible = ref(false);

let store = useStore();

let getColorNames = computed(() => {
  return store.getters['getColorNames'];
});

let currentThemeColor = computed(() => {
  return store.state.currentThemeColor.color;
});

let activeIndex1 = ref('1');

let leftMenuOpen = ref(true);

const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const handleClose = () => {
  console.log('handleClose');
  console.log(currentThemeColor);
};

const handleOpen = () => {
  console.log('handleOpen');
};

const changeThemeColor = (index: number) => {
  let color = store.state.colors[index];
  store.dispatch('commitCurrentThemeColor', color);
};

const handleLogin = (val: boolean) => {
  if (!val) {
    dialogVisible.value = true;
  }
}

const registerClose = (val: any) => {
  dialogVisible.value = val.dialogVisible;
}

onMounted(async () => {
  // console.log(route.query.abc, 'data from login page');
});
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left {
    transition: all 0.5s;
    border-right: none;

    // height: fit-content;
    .logo {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        color: #eee;
        border: 1px solid #eee;
        border-radius: 4px;
        font-size: 18px;
        padding: 4px 10px;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        color: white;
      }

      .item {
        width: 650px;
      }
    }

    .bottom {
      flex: 1;
    }
  }
}
</style>
