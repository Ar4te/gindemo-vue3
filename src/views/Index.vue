<template>
  index
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(async () => {
  console.log(route.query.abc, 'data from login page');
});
</script>
<style scoped lang="less"></style>
