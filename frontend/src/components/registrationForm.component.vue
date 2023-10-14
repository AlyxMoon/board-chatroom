<script setup lang="ts">
import { ref } from 'vue'
import app from '../api.ts'

const username = ref('')
const password = ref('')

const signIn = async () => {
  await app.authenticate({
    strategy: 'local',
    username: username.value, password: password.value,
  })
}

const signUp = async () => {
  try {
    const user = await app.service('users').create({
      username: username.value,
      password: password.value,
      color: '#3FB0AC',
    })

    await app.authenticate({
      strategy: 'local',
      username: username.value, password: password.value,
    })
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <section>
    <label>Username</label>
    <input class="u-full-width" type="text" v-model="username">

    <label>Password</label>
    <input class="u-full-width" type="password" v-model="password">

    <div>
      <button @click="signIn()">Sign In</button>
      <button @click="signUp()">Sign Up</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  max-width: 500px;
  margin: 0 auto;

  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;

  div {
    grid-column: 1 / 3;

    display: flex;
    gap: 10px;
    justify-content: stretch;

    button {
      flex-grow: 1;

      &:nth-child(1) {
        background-color: #3FB0AC;
        border-color: #333333;
        color: #333333;
      }
    }
  }
}
</style>
