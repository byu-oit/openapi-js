import { Static, TSchema, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ContactObjectSchema = Type.Object({
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

export type ContactObjectType = Static<typeof ContactObjectSchema>

export const ContactObjectReferences: TSchema[] = []

export const isContactObject = TypeCompiler.Compile(ContactObjectSchema, ContactObjectReferences)
