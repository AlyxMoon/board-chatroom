import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  usersDataValidator,
  usersPatchValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersPatchResolver,
  usersQueryResolver
} from './users.schema'

export default {
  around: {
    all: [schemaHooks.resolveExternal(usersExternalResolver), schemaHooks.resolveResult(usersResolver)],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },
  before: {
    all: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)],
    find: [],
    get: [],
    create: [schemaHooks.validateData(usersDataValidator), schemaHooks.resolveData(usersDataResolver)],
    patch: [schemaHooks.validateData(usersPatchValidator), schemaHooks.resolveData(usersPatchResolver)],
    remove: []
  },
  after: {
    all: []
  },
  error: {
    all: []
  }
}
