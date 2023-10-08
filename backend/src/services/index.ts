import { Application } from '@feathersjs/feathers'
import { MessageService } from './messages.service'
import { UserService } from './users.service'

export type ServiceTypes = {
  messages: MessageService,
  users: UserService,
}

export const ConfigureServices = (app: Application): Application => {
  console.log('configuring services')
  app.use('messages', new MessageService())
  app.use('users', new UserService())

  return app
}
