import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './Schema'
import { TReference } from './Reference'
import { TExample } from './Example'
import { TParameterStyle } from './Parameter'

export const THeader = Type.Object({
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(TParameterStyle)),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(TSchema, { default: TSchema.examples[0] })),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TExample, { default: TExample.examples[0] })
  ])))
}, {
  $id: 'Header',
  examples: [
    {},
    {
      description: 'The number of allowed requests in the current period',
      schema: {
        type: 'integer'
      }
    }
  ]
})

export type Header = Static<typeof THeader>
