<template>
  <div class="content">
    <h1>Rsbuild with Vue</h1>
    <p>Start building amazing things with Rsbuild.</p>
    <div class="flex p-4 w-full justify-center">
      <van-button type="warning" @click="switchLanguage('en')">English</van-button>
      <div class="w-10"></div>
      <van-button type="primary" @click="switchLanguage('zh')" class="pl-4">中文</van-button>
    </div>
    <van-tabbar v-model="active" active-color="#1989fa" inactive-color="#7d7e80" fixed>
      <van-tabbar-item icon="home-o" to="/">Home</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/about">About</van-tabbar-item></van-tabbar>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { ref } from 'vue';
const active = ref(0);

const { locale } = useI18n();
const switchLanguage = (lang: string) => {
  locale.value = lang; // Switch language dynamically
};
</script>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
