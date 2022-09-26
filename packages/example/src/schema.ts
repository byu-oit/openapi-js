import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ExampleObjectExamples: [unknown, ...unknown[]] = [
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

export const ExampleObjectSchema = Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  value: Type.Optional(Type.Unknown()),
  externalValue: Type.Optional(Type.String())
}, {
  $id: 'Example',
  examples: ExampleObjectExamples
})

export type ExampleObjectType = Static<typeof ExampleObjectSchema>

export const ExampleObjectReferences: TSchema[] = []

export const isExampleObject = TypeCompiler.Compile(ExampleObjectSchema, ExampleObjectReferences)
