import { feathers } from '@feathersjs/feathers'
import { koa, rest, bodyParser, errorHandler } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import { initializeDB } from './db'
import { ConfigureServices, ServiceTypes } from './services'

const main = async () => {
  await initializeDB()
  const app = koa<ServiceTypes>(feathers())
  
  app.use(errorHandler())
  app.use(bodyParser())
  app.configure(rest())
  app.configure(socketio())
  app.configure(ConfigureServices)
  
  app.listen(3030).then(() => console.log('Feathers server listening on port 3030.'))
}

main()
