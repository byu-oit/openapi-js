import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  ServerObjectSchema,
  ServerObjectReferences,
  ServerObjectExamples
} from '@byu-oit/openapi.server'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const LinkObjectExamples: [unknown, ...unknown[]] = [
  {},
  {
    operationId: 'getUserAddress',
    parameters: {
      userId: '$request.path.id'
    }
  },
  {
    operationRef: '#/paths/~12.0~1repositories~1{username}/get',
    parameters: {
      username: '$response.body#/username'
    }
  }
]

export const LinkObjectSchema = Type.Object({
  operationRef: Type.Optional(Type.String()),
  operationId: Type.Optional(Type.String()),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  requestBody: Type.Optional(Type.Unknown()),
  description: Type.Optional(Type.String()),
  server: Type.Optional(Type.Ref(ServerObjectSchema, { default: ServerObjectExamples[0] }))
}, {
  $id: 'Link',
  examples: LinkObjectExamples
})

export type LinkObjectType = Static<typeof LinkObjectSchema>

export const LinkObjectReferences: TSchema[] = Array.from(new Set([
  ServerObjectSchema, ...ServerObjectReferences
]))

export const isLinkObject = TypeCompiler.Compile(LinkObjectSchema, LinkObjectReferences)
