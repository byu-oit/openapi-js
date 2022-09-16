import { Static, TSchema, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ReferenceObjectSchema = Type.Object({
  $ref: Type.String()
}, {
  $id: 'Reference',
  examples: [
    {
      $ref: '#/components/schemas/SomePayload'
    }
  ]
})

export type ReferenceObjectType = Static<typeof ReferenceObjectSchema>

export const ReferenceObjectReferences: TSchema[] = []

export const isReferenceObject = TypeCompiler.Compile(ReferenceObjectSchema)
