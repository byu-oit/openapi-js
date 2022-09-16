import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ExampleObjectSchema = Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  value: Type.Optional(Type.Any()),
  externalValue: Type.Optional(Type.String())
}, {
  $id: 'Example',
  examples: [
    {},
    {
      summary: 'A foo example',
      value: { foo: 'bar' }
    },
    {
      summary: 'This is a text example',
      externalValue: 'https://foo.bar/examples/address-example.txt'
    }
  ]
})

export type ExampleObjectType = Static<typeof ExampleObjectSchema>

export const ExampleObjectReferences = []

export const isExampleObject = TypeCompiler.Compile(ExampleObjectSchema, ExampleObjectReferences)
