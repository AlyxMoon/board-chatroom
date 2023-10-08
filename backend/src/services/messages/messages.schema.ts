import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

export const messagesSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    userId: Type.String({ format: 'uuid' }),
    text: Type.String({ minLength: 1, maxLength: 255 }),
    createdAt: Type.String({ format: 'date-time' }),
  },
  { $id: 'Messages', additionalProperties: false }
)
export type Messages = Static<typeof messagesSchema>
export const messagesValidator = getValidator(messagesSchema, dataValidator)
export const messagesResolver = resolve<Messages, HookContext>({})

export const messagesDataSchema = Type.Pick(messagesSchema, 
  ['text'],
  { $id: 'MessagesData' },
)
export type MessagesData = Static<typeof messagesDataSchema>
export const messagesDataValidator = getValidator(messagesDataSchema, dataValidator)
export const messagesDataResolver = resolve<Messages, HookContext>({
  userId: async (value, message, context) => context.params.user?.id,
  createdAt: async (value, message, context) => (new Date()).toISOString(),
})

export const messagesQueryProperties = Type.Pick(
  messagesSchema, 
  ['id', 'userId', 'text', 'createdAt']
)
export const messagesQuerySchema = Type.Intersect(
  [
    querySyntax(messagesQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MessagesQuery = Static<typeof messagesQuerySchema>
export const messagesQueryValidator = getValidator(messagesQuerySchema, queryValidator)
export const messagesQueryResolver = resolve<MessagesQuery, HookContext>({})
