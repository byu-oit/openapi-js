import { Static, Type } from '@sinclair/typebox'

export const TContact = Type.Object({
  name: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
  email: Type.Optional(Type.String())
}, {
  $id: 'Contact',
  examples: [
    {},
    {
      name: 'API Support',
      url: 'https://www.example.com/support',
      email: 'support@example.com'
    }
  ]
})

export type Contact = Static<typeof TContact>
