import { users } from './users/users'
import { Application } from '../declarations'
import { MessageService } from './messages.service'

export const services = (app: Application): Application => {
  app.use('messages', new MessageService())
  app.configure(users)
  return app
}
