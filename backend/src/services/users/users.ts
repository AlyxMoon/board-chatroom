

import type { Application } from '../../declarations'
import { UsersService } from './users.service'
import hooks from './users.hooks'

export const usersPath = 'users'
export const usersMethods = ['get', 'find', 'create'] as const

export * from './users.service'
export * from './users.schema'

export const users = (app: Application) => {
  app.use(usersPath, new UsersService, {
    methods: usersMethods,
    events: []
  })
  app.service(usersPath).hooks(hooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [usersPath]: UsersService
  }
}
