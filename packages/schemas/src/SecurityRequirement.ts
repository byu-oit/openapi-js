import { Type, Static } from '@sinclair/typebox'

export const TSecurityRequirement = Type.Record(Type.String(), Type.Array(Type.String()), {
  $id: 'SecurityRequirement',
  examples: [
    {
      api_key: []
    },
    {
      petstore_auth: [
        'write:pets',
        'read:pets'
      ]
    }
  ]
})

export type SecurityRequirement = Static<typeof TSecurityRequirement>
