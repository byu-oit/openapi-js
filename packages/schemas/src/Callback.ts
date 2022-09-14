import { Type, Static } from '@sinclair/typebox'
import { TReference } from './Reference'
import { TPathItem } from './PathItem'

export const TCallback = Type.Record(Type.String(), Type.Union([
  Type.Ref(TReference, { default: TReference.examples[0] }),
  Type.Ref(TPathItem, { default: TPathItem.examples[0] })
]), {
  $id: 'Callback',
  examples: [
    {},
    {
      myCallback: {
        '{$request.query.queryUrl}': {
          post: {
            requestBody: {
              description: 'Callback payload',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/SomePayload'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'callback successfully processed'
              }
            }
          }
        }
      }
    }
  ]
})

export type Callback = Static<typeof TCallback>
