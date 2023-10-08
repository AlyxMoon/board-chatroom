import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  messagesDataValidator,
  messagesQueryValidator,
  messagesResolver,
  messagesDataResolver,
  messagesQueryResolver
} from './messages.schema'

export default {
  around: {
    all: [
      authenticate('jwt'),
      schemaHooks.resolveResult(messagesResolver),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  before: {
    all: [
      schemaHooks.validateQuery(messagesQueryValidator),
      schemaHooks.resolveQuery(messagesQueryResolver),
    ],
    find: [],
    get: [],
    create: [
      schemaHooks.validateData(messagesDataValidator),
      schemaHooks.resolveData(messagesDataResolver),
    ],
    patch: [],
    remove: []
  },
  after: {
    all: []
  },
  error: {
    all: []
  }
}
