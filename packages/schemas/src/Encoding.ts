import { Type, Static } from '@sinclair/typebox'
import { TReference } from './Reference'
import { THeader } from './Header'

export const TEncoding = Type.Object({
  contentType: Type.Optional(Type.String()),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(THeader, { default: THeader.examples[0] })
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

export type Encoding = Static<typeof TEncoding>
