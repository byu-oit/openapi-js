import { Static, Type } from '@sinclair/typebox'

export const TLicense = Type.Object({
  name: Type.String(),
  identifier: Type.Optional(Type.String()),
  url: Type.Optional(Type.String())
}, {
  $id: 'License',
  examples: [
    {
      name: 'Apache 2.0'
    },
    {
      name: 'Apache 2.0',
      identifier: 'Apache-2.0'
    }
  ]
})

export type License = Static<typeof TLicense>
