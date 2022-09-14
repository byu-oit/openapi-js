import { Type, Static } from '@sinclair/typebox'
import { TServer } from './Server'

export const TLink = Type.Object({
  operationRef: Type.Optional(Type.String()),
  operationId: Type.Optional(Type.String()),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Any())),
  requestBody: Type.Optional(Type.Any()),
  description: Type.Optional(Type.String()),
  server: Type.Optional(Type.Ref(TServer, { default: TServer.examples[0] }))
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

export type Link = Static<typeof TLink>
