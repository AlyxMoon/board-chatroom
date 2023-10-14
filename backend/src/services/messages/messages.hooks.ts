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
      schemaHooks.resolveResult<any>(messagesResolver),
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
      schemaHooks.resolveQuery<any>(messagesQueryResolver),
    ],
    find: [],
    get: [],
    create: [
      schemaHooks.validateData(messagesDataValidator),
      schemaHooks.resolveData<any>(messagesDataResolver),
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
