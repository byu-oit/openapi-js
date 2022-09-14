import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './Schema'
import { TReference } from './Reference'
import { TExample } from './Example'
import { TEncoding } from './Encoding'

export const TMediaType = Type.Object({
  schema: Type.Optional(Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TSchema, { default: TSchema.examples[0] })
  ])),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TExample, { default: TExample.examples[0] })
  ]))),
  encoding: Type.Optional(Type.Record(Type.String(), Type.Ref(TEncoding)))
}, {
  $id: 'MediaType',
  examples: [
    {},
    {
      schema: {
        $ref: '#/components/schemas/Pet'
      },
      examples: {
        cat: {
          summary: 'An example of a cat',
          value: {
            name: 'Fluffy',
            petType: 'Cat',
            color: 'White',
            gender: 'male',
            breed: 'Persian'
          }
        },
        dog: {
          summary: 'An example of a dog with a cat\'s name',
          value: {
            name: 'Puma',
            petType: 'Dog',
            color: 'Black',
            gender: 'Female',
            breed: 'Mixed'
          },
          frog: {
            $ref: '#/components/examples/frog-example'
          }
        }
      }
    }
  ]
})

export type MediaType = Static<typeof TMediaType>
