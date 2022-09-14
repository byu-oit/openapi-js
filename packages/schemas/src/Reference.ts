import { Static, Type } from '@sinclair/typebox'

export const TReference = Type.Object({
  $ref: Type.String()
}, {
  $id: 'Reference',
  examples: [
    {
      $ref: '#/components/schemas/SomePayload'
    }
  ]
})

export type Reference = Static<typeof TReference>
