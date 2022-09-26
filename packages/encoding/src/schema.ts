import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  ReferenceObjectSchema,
  ReferenceObjectReferences,
  ReferenceObjectExamples
} from '@byu-oit/openapi.reference'
import {
  HeaderObjectSchema,
  HeaderObjectReferences,
  HeaderObjectExamples
} from '@byu-oit/openapi.header'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const EncodingObjectExamples: [unknown, ...unknown[]] = [
  {
    contentType: 'application/xml; charset=utf-8'
  },
  {
    contentType: 'image/png, image/jpeg',
    headers: {
      'X-Rate-Limit-Limit': {
        description: 'The number of allowed requests in the current period',
        schema: {
          type: 'integer'
        }
      }
    }
  }
]

export const EncodingObjectSchema = Type.Object({
  contentType: Type.Optional(Type.String()),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(HeaderObjectSchema, { default: HeaderObjectExamples[0] })
  ]))),
  style: Type.Optional(Type.String()),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean())
}, {
  $id: 'Encoding',
  examples: EncodingObjectExamples
})

export type EncodingObjectType = Static<typeof EncodingObjectSchema>

export const EncodingObjectReferences: TSchema[] = Array.from(new Set([
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  HeaderObjectSchema, ...HeaderObjectReferences
]))

export const isEncodingObject = TypeCompiler.Compile(EncodingObjectSchema, EncodingObjectReferences)
