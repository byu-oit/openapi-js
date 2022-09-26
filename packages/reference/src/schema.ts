import { Static, TSchema, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ReferenceObjectExamples: [unknown, ...unknown[]] = [
  {
    $ref: '#/components/schemas/SomePayload'
  }
]

export const ReferenceObjectSchema = Type.Object({
  $ref: Type.String(),
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String())
}, {
  $id: 'Reference',
  examples: ReferenceObjectExamples
})

export type ReferenceObjectType = Static<typeof ReferenceObjectSchema>

export const ReferenceObjectReferences: TSchema[] = []

export const isReferenceObject = TypeCompiler.Compile(ReferenceObjectSchema, ReferenceObjectReferences)
