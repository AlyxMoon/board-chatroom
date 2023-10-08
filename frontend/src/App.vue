<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { feathers } from '@feathersjs/feathers'
import authentication from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030')
const app = feathers()

app.configure(socketio(socket))
app.configure(authentication())

const messageText = ref('')
const messages = ref<any[]>([])

onMounted(async () => {
  const response = await app.authenticate({
    strategy: 'local',
    username: 'Allister 1',
    password: 'Password1',
  })
  console.log(response)

  socket.emit('find', 'messages', {}, (err: any, data: any[]) => {
    if (err) { return; }
    messages.value = data
  })
})

const sendMessage = async () => {
  app.service('messages').create({
    text: messageText.value,
  })
}

app.service('messages').on('created', data => {
  console.log('made a message', data)
  messages.value.unshift(data)
})

</script>

<template>
  <h1>Application</h1>

  <input type="text" v-model="messageText">
  <button @click="sendMessage()">Send Message</button>

  <ul>
    <li v-for="message in messages" :key="message.id">
      {{ message.createdAt }}: {{ message.text }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
</style>
