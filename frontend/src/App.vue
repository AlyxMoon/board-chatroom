<script setup lang="ts">

import { onMounted, ref } from 'vue';

import app from './api.ts'
import RegistrationForm from './components/registrationForm.component.vue'

const loaded = ref(false)
const authenticated = ref(false)
const messageText = ref('')
const messages = ref<any[]>([])

onMounted(async () => {
  authenticated.value = app.authentication.authenticated
  const existingToken = await app.authentication.getAccessToken()
  if (existingToken) { await app.reAuthenticate() }

  messages.value = await app.service('messages').find()
  console.log(messages.value)

  loaded.value = true
})

const sendMessage = async () => {
  await app.service('messages').create({
    text: messageText.value,
  })
}

const logout = async () => {
  await app.authentication.logout()
}

app.service('messages').on('created', data => {
  console.log('made a message', data)
  messages.value.unshift(data)
})

app.on('login', (data) => {
  console.log('we have logged in', data)
  authenticated.value = true
})

app.on('logout', () => {
  authenticated.value = false
})

</script>

<template>
  <template v-if="loaded">
    <header>
      <div></div>
      <h1>Application</h1>

      <button v-if="authenticated" @click="logout()">LogOut</button>
    </header>

    <RegistrationForm v-if="!authenticated"></RegistrationForm>

    <div v-else>
      <input type="text" v-model="messageText">
      <button @click="sendMessage()">Send Message</button>

      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.username }}: {{ message.text }}
        </li>
      </ul>
    </div>
  </template>
</template>

<style lang="scss" scoped>
header {
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  align-items: center;

  text-align: center;

  button {
    padding: 0.2rem 1rem;
    line-height: 1;
  }
}
</style>
