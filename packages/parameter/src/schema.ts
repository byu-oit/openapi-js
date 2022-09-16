import { SchemaObjectReferences, SchemaObjectSchema } from '@byu-oit/openapi.schema'
import {
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import { ExampleObjectReferences, ExampleObjectSchema } from '@byu-oit/openapi.example'
import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ParameterLocationSchema = Type.Union([
  Type.Literal('query'),
  Type.Literal('header'),
  Type.Literal('path'),
  Type.Literal('cookie')
], {
  $id: 'ParameterLocation',
  examples: [
    'query',
    'header',
    'path',
    'cookie'
  ]
})

export type ParameterLocationType = Static<typeof ParameterLocationSchema>

export const ParameterStyleSchema = Type.Union([
  Type.Literal('form'),
  Type.Literal('simple')
], {
  $id: 'ParameterStyle',
  examples: [
    'form',
    'simple'
  ]
})

export type ParameterStyleType = Static<typeof ParameterStyleSchema>

export const ParameterObjectSchema = Type.Object({
  name: Type.String(),
  in: Type.Ref(ParameterLocationSchema, { default: ParameterLocationSchema.examples[0] }),
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(ParameterStyleSchema, { default: ParameterStyleSchema.examples[0] })),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(SchemaObjectSchema, { default: SchemaObjectSchema.examples[0] })),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(ExampleObjectSchema, { default: ExampleObjectSchema.examples[0] })
  ])))
}, {
  $id: 'Parameter',
  examples: [
    {
      name: 'sessionId',
      in: 'cookie'
    },
    {
      name: 'token',
      in: 'header',
      description: 'token to be passed as a header',
      required: true,
      schema: {
        type: 'array',
        items: {
          type: 'integer',
          format: 'int64'
        }
      },
      style: 'simple'
    },
    {
      name: 'id',
      in: 'query',
      description: 'ID of the object to fetch',
      required: false,
      schema: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      style: 'form',
      explode: true
    }
  ]
})

export type ParameterObjectType = Static<typeof ParameterObjectSchema>

export const ParameterObjectReferences: TSchema[] = Array.from(new Set([
  ExampleObjectSchema, ...ExampleObjectReferences,
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  SchemaObjectSchema, ...SchemaObjectReferences,
  ParameterStyleSchema,
  ParameterLocationSchema
]))

export const isParameterObject = TypeCompiler.Compile(ParameterObjectSchema, ParameterObjectReferences)
