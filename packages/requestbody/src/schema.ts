import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  MediaTypeObjectSchema,
  MediaTypeObjectReferences,
  MediaTypeObjectExamples
} from '@byu-oit/openapi.mediatype'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const RequestBodyObjectExamples: [unknown, ...unknown[]] = [
  { content: {} },
  {
    description: 'user to add to the system',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User'
        },
        examples: {
          user: {
            summary: 'User Example',
            externalValue: 'https://foo.bar/examples/user-example.json'
          }
        }
      },
      'application/xml': {
        schema: {
          $ref: '#/components/schemas/User'
        },
        examples: {
          user: {
            summary: 'User example in XML',
            externalValue: 'https://foo.bar/examples/user-example.xml'
          }
        }
      },
      'text/plain': {
        examples: {
          user: {
            summary: 'User example in Plain text',
            externalValue: 'https://foo.bar/examples/user-example.txt'
          }
        }
      },
      '*/*': {
        examples: {
          user: {
            summary: 'User example in other format',
            externalValue: 'https://foo.bar/examples/user-example.whatever'
          }
        }
      }
    }
  }
]

export const RequestBodyObjectSchema = Type.Object({
  description: Type.Optional(Type.String()),
  content: Type.Record(Type.String(), Type.Ref(MediaTypeObjectSchema, { default: MediaTypeObjectExamples[0] })),
  required: Type.Optional(Type.Boolean())
}, {
  $id: 'RequestBody',
  examples: RequestBodyObjectExamples
})

export type RequestBodyObjectType = Static<typeof RequestBodyObjectSchema>

export const RequestBodyObjectReferences: TSchema[] = Array.from(new Set([
  MediaTypeObjectSchema, ...MediaTypeObjectReferences
]))

export const isRequestBodyObject = TypeCompiler.Compile(RequestBodyObjectSchema, RequestBodyObjectReferences)
