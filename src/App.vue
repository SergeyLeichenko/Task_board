<template>
  <main>
    <Main />

    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Main from '@/components/v-Main.vue'
</script>

<style scoped></style>
