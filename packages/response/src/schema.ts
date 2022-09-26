import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  ReferenceObjectExamples,
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import {
  HeaderObjectExamples,
  HeaderObjectReferences,
  HeaderObjectSchema
} from '@byu-oit/openapi.header'
import {
  MediaTypeObjectExamples,
  MediaTypeObjectReferences,
  MediaTypeObjectSchema
} from '@byu-oit/openapi.mediatype'
import {
  LinkObjectExamples,
  LinkObjectReferences,
  LinkObjectSchema
} from '@byu-oit/openapi.link'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ResponseObjectExamples: [unknown, ...unknown[]] = [
  {
    description: 'a pet to be returned',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Pet'
        }
      }
    }
  },
  {
    description: 'A simple string response',
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          example: 'whoa!'
        }
      }
    },
    headers: {
      'X-Rate-Limit-Limit': {
        description: 'The number of allowed requests in the current period',
        schema: {
          type: 'integer'
        }
      },
      'X-Rate-Limit-Remaining': {
        description: 'The number of remaining requests in the current period',
        schema: {
          type: 'integer'
        }
      },
      'X-Rate-Limit-Reset': {
        description: 'The number of seconds left in the current period',
        schema: {
          type: 'integer'
        }
      }
    }
  }
]

export const ResponseObjectSchema = Type.Object({
  description: Type.String(),
  headers: Type.Optional(Type.Record(
    Type.String(),
    Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(HeaderObjectSchema, { default: HeaderObjectExamples[0] })
    ])
  )),
  content: Type.Optional(Type.Record(
    Type.String(),
    Type.Ref(MediaTypeObjectSchema, { default: MediaTypeObjectExamples[0] })
  )),
  links: Type.Optional(Type.Record(
    Type.String(),
    Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(LinkObjectSchema, { default: LinkObjectExamples[0] })
    ])))
}, {
  $id: 'Response',
  examples: ResponseObjectExamples
})

export type ResponseObjectType = Static<typeof ResponseObjectSchema>

export const ResponseObjectReferences: TSchema[] = Array.from(new Set([
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  HeaderObjectSchema, ...HeaderObjectReferences,
  MediaTypeObjectSchema, ...MediaTypeObjectReferences,
  LinkObjectSchema, ...LinkObjectReferences
]))

export const isResponseObject = TypeCompiler.Compile(ResponseObjectSchema, ResponseObjectReferences)
