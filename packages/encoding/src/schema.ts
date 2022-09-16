import { Type, Static } from '@sinclair/typebox'
import { ReferenceObjectSchema, ReferenceObjectReferences } from '@byu-oit/openapi.reference'
import { HeaderObjectSchema, HeaderObjectReferences } from '@byu-oit/openapi.header'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const EncodingObjectSchema = Type.Object({
  contentType: Type.Optional(Type.String()),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(HeaderObjectSchema, { default: HeaderObjectSchema.examples[0] })
  ]))),
  style: Type.Optional(Type.String()),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean())
}, {
  $id: 'Encoding',
  examples: [
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
})

export type EncodingObjectType = Static<typeof EncodingObjectSchema>

export const EncodingObjectReferences = Array.from(new Set([
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  HeaderObjectSchema, ...HeaderObjectReferences
]))

export const isEncodingObject = TypeCompiler.Compile(EncodingObjectSchema, EncodingObjectReferences)
