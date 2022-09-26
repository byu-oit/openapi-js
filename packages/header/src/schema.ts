import { Type, Static, TSchema } from '@sinclair/typebox'
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
import { ParameterStyleSchema } from '@byu-oit/openapi.parameter'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const HeaderObjectExamples: [unknown, ...unknown[]] = [
  {},
  {
    description: 'The number of allowed requests in the current period',
    schema: {
      type: 'integer'
    }
  }
]

export const HeaderObjectSchema = Type.Object({
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(ParameterStyleSchema)),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(SchemaObjectSchema, { default: SchemaObjectExamples[0] })),
  example: Type.Optional(Type.Unknown()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(ExampleObjectSchema, { default: ExampleObjectExamples[0] })
  ])))
}, {
  $id: 'Header',
  examples: HeaderObjectExamples
})

export type HeaderObjectType = Static<typeof HeaderObjectSchema>

export const HeaderObjectReferences: TSchema[] = Array.from(new Set([
  SchemaObjectSchema, ...SchemaObjectReferences,
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  ExampleObjectSchema, ...ExampleObjectReferences,
  ParameterStyleSchema,
]))

export const isHeaderObject = TypeCompiler.Compile(HeaderObjectSchema, HeaderObjectReferences)
