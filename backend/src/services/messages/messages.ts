

import type { Application } from '../../declarations'
import { MessageService } from './messages.service'
import hooks from './messages.hooks'

export const messagesPath = 'messages'
export const messagesMethods = ['find', 'create'] as const

export * from './messages.service'
export * from './messages.schema'

export const messages = (app: Application) => {
  app.use(messagesPath, new MessageService, {
    methods: messagesMethods,
    events: []
  })
  app.service(messagesPath).hooks(hooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [messagesPath]: MessageService
  }
}
