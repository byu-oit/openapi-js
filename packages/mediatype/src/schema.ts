import { Type, Static, TSchema } from '@sinclair/typebox'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import {
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import { ExampleObjectSchema, ExampleObjectReferences } from '@byu-oit/openapi.example'
import { EncodingObjectSchema, EncodingObjectReferences } from '@byu-oit/openapi.encoding'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const MediaTypeObjectSchema = Type.Object({
  schema: Type.Optional(Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(SchemaObjectSchema, { default: SchemaObjectSchema.examples[0] })
  ])),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(ExampleObjectSchema, { default: ExampleObjectSchema.examples[0] })
  ]))),
  encoding: Type.Optional(Type.Record(Type.String(), Type.Ref(EncodingObjectSchema)))
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

export type MediaTypeObjectType = Static<typeof MediaTypeObjectSchema>

export const MediaTypeObjectReferences: TSchema[] = Array.from(new Set([
  ExampleObjectSchema, ...ExampleObjectReferences,
  EncodingObjectSchema, ...EncodingObjectReferences,
  ReferenceObjectSchema, ...ReferenceObjectReferences
]))

export const isMediaTypeObject = TypeCompiler.Compile(MediaTypeObjectSchema, MediaTypeObjectReferences)
