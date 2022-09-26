import {
  SchemaObjectExamples,
  SchemaObjectReferences,
  SchemaObjectSchema
} from '@byu-oit/openapi.schema'
import {
  ReferenceObjectExamples,
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import {
  ExampleObjectExamples,
  ExampleObjectReferences,
  ExampleObjectSchema
} from '@byu-oit/openapi.example'
import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ParameterLocationExamples: [unknown, ...unknown[]] = [
  'query',
  'header',
  'path',
  'cookie'
]

export const ParameterLocationSchema = Type.Union([
  Type.Literal('query'),
  Type.Literal('header'),
  Type.Literal('path'),
  Type.Literal('cookie')
], {
  $id: 'ParameterLocation',
  examples: ParameterLocationExamples
})

export type ParameterLocationType = Static<typeof ParameterLocationSchema>

export const ParameterStyleExamples: [unknown, ...unknown[]] = [
  'form',
  'simple'
]

export const ParameterStyleSchema = Type.Union([
  Type.Literal('form'),
  Type.Literal('simple')
], {
  $id: 'ParameterStyle',
  examples: ParameterStyleExamples
})

export type ParameterStyleType = Static<typeof ParameterStyleSchema>

export const ParameterObjectExamples: [unknown, ...unknown[]] = [
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

export const ParameterObjectSchema = Type.Object({
  name: Type.String(),
  in: Type.Ref(ParameterLocationSchema, { default: ParameterLocationExamples[0] }),
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(ParameterStyleSchema, { default: ParameterStyleExamples[0] })),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(SchemaObjectSchema, { default: SchemaObjectExamples[0] })),
  example: Type.Optional(Type.Unknown()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(ExampleObjectSchema, { default: ExampleObjectExamples[0] })
  ])))
}, {
  $id: 'Parameter',
  examples: ParameterObjectExamples
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
