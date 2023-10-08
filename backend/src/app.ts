import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { cors, koa, rest, bodyParser, errorHandler, parseAuthentication } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import { configurationValidator } from './configuration'
import type { Application } from './declarations'
import { initializeDB } from './db'
import { services } from './services'
import { authentication } from './authentication'

const main = async () => {
  await initializeDB()
  
  const app: Application = koa(feathers())
  app.configure(configuration(configurationValidator))

  app.use(cors())
  app.use(errorHandler())
  app.use(parseAuthentication())
  app.use(bodyParser())
  app.configure(rest())
  app.configure(socketio({
    cors: {
      origin: app.get('origins')
    }
  }))
  app.configure(authentication)
  app.configure(services)

  app.on('connection', (connection) => {
    console.log(connection)
    return app.channel('everybody').join(connection)
  })
  app.publish((_data) => app.channel('everybody'))
  
  const host = app.get('host')
  const port = app.get('port')
  app.listen(port).then(() => console.log(`Feathers server listening on port ${host}:${port}`))
}

main()
