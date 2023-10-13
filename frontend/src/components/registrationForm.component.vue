<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

</script>

<template>
  <div>
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <button>Sign Up</button>
  </div>
</template>

<style scoped lang="scss">

</style>
