import { Type, Static, TSchema } from '@sinclair/typebox'
import { ServerObjectSchema, ServerObjectReferences } from '@byu-oit/openapi.server'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const LinkObjectSchema = Type.Object({
  operationRef: Type.Optional(Type.String()),
  operationId: Type.Optional(Type.String()),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Any())),
  requestBody: Type.Optional(Type.Any()),
  description: Type.Optional(Type.String()),
  server: Type.Optional(Type.Ref(ServerObjectSchema, { default: ServerObjectSchema.examples[0] }))
}, {
  $id: 'Link',
  examples: [
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
})

export type LinkObjectType = Static<typeof LinkObjectSchema>

export const LinkObjectReferences: TSchema[] = Array.from(new Set([
  ServerObjectSchema, ...ServerObjectReferences
]))

export const isLinkObject = TypeCompiler.Compile(LinkObjectSchema, LinkObjectReferences)
