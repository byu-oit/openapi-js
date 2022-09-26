import {
  ServerVariableObjectExamples,
  ServerVariableObjectReferences,
  ServerVariableObjectSchema
} from '@byu-oit/openapi.servervariable'
import { Static, TSchema, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ServerObjectExamples: [unknown, ...unknown[]] = [
  {
    url: 'https://development.gigantic-server.com/v1',
    description: 'Development server'
  }
]

export const ServerObjectSchema = Type.Object({
  url: Type.String(),
  description: Type.Optional(Type.String()),
  variables: Type.Optional(Type.Record(Type.String(), Type.Ref(ServerVariableObjectSchema, { default: ServerVariableObjectExamples[0] })))
}, {
  $id: 'Server',
  examples: ServerObjectExamples
})

export type ServerObjectType = Static<typeof ServerObjectSchema>

export const ServerObjectReferences: TSchema[] = Array.from(new Set([
  ServerVariableObjectSchema, ...ServerVariableObjectReferences
]))

export const isServerObject = TypeCompiler.Compile(ServerObjectSchema, ServerObjectReferences)
