import { Static, TSchema, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ServerVariableObjectExamples: [unknown, ...unknown[]] = [
  { default: 'example' },
  {
    enum: ['example', 'nonExample'],
    default: 'example',
    description: 'An example server variable'
  }
]

export const ServerVariableObjectSchema = Type.Object({
  enum: Type.Optional(Type.Array(Type.String())),
  default: Type.String(),
  description: Type.Optional(Type.String())
}, {
  $id: 'ServerVariable',
  examples: ServerVariableObjectExamples
})

export type ServerVariableObjectType = Static<typeof ServerVariableObjectSchema>

export const ServerVariableObjectReferences: TSchema[] = []

export const isServerVariableObject = TypeCompiler.Compile(ServerVariableObjectSchema, ServerVariableObjectReferences)
