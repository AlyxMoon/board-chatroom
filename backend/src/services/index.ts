import { Application } from '../declarations'
import { messages } from './messages/messages'
import { users } from './users/users'

export const services = (app: Application): Application => {
  app.configure(messages)
  app.configure(users)
  return app
}
