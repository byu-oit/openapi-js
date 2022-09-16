import {
  ServerVariableObjectReferences,
  ServerVariableObjectSchema
} from '@byu-oit/openapi.servervariable'
import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ServerObjectSchema = Type.Object({
  url: Type.String(),
  description: Type.Optional(Type.String()),
  variables: Type.Optional(Type.Record(Type.String(), Type.Ref(ServerVariableObjectSchema, { default: ServerVariableObjectSchema.examples[0] })))
}, {
  $id: 'Server',
  examples: [
    {
      url: 'https://development.gigantic-server.com/v1',
      description: 'Development server'
    }
  ]
})

export type ServerObjectType = Static<typeof ServerObjectSchema>

export const ServerObjectReferences = Array.from(new Set([
  ServerVariableObjectSchema, ...ServerVariableObjectReferences
]))

export const isServerObject = TypeCompiler.Compile(ServerObjectSchema, ServerObjectReferences)
