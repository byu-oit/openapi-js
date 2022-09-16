import { Static, Type } from '@sinclair/typebox'
import { semver } from '@byu-oit/openapi.common'
import { InfoObjectReferences, InfoObjectSchema } from '@byu-oit/openapi.info'
import { ServerObjectSchema, ServerObjectReferences } from '@byu-oit/openapi.server'
import { PathItemObjectReferences, PathItemObjectSchema } from '@byu-oit/openapi.pathitem'
import {
  ComponentsObjectReferences,
  ComponentsObjectSchema
} from '@byu-oit/openapi.components'
import {
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from '@byu-oit/openapi.securityrequirement'
import { TagObjectReferences, TagObjectSchema } from '@byu-oit/openapi.tag'
import {
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import {
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const DocumentObjectSchema = Type.Object({
  openapi: Type.String({ pattern: semver.source, default: '3.1.0' }),
  info: Type.Ref(InfoObjectSchema, { default: InfoObjectSchema.examples[0] }),
  jsonSchemaDialect: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectSchema.examples[0] }))),
  paths: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(PathItemObjectSchema, { default: PathItemObjectSchema.examples[0] })
  ]))),
  webhooks: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(PathItemObjectSchema, { default: PathItemObjectSchema.examples[0] })
  ]))),
  components: Type.Optional(Type.Ref(ComponentsObjectSchema, { default: ComponentsObjectSchema.examples[0] })),
  security: Type.Optional(Type.Array(Type.Ref(SecurityRequirementObjectSchema, { default: SecurityRequirementObjectSchema.examples[0] }))),
  tags: Type.Optional(Type.Array(Type.Ref(TagObjectSchema, { default: TagObjectSchema.examples[0] }))),
  externalDocs: Type.Optional(Type.Ref(ExternalDocumentationObjectSchema, { default: ExternalDocumentationObjectSchema.examples[0] }))
}, {
  $id: 'Document',
  examples: [
    {
      openapi: '3.1.0',
      info: {
        title: 'Example API',
        version: '1.0.0'
      }
    },
    // ODOObjectSchema - Extend this example to make it more robust
    {
      openapi: '3.1.0',
      info: {
        title: 'Example API',
        version: '1.0.0'
      }
    }
  ]
})

export type DocumentObjectType = Static<typeof DocumentObjectSchema>

export const DocumentObjectReferences = Array.from(new Set([
  InfoObjectSchema, ...InfoObjectReferences,
  ServerObjectSchema, ...ServerObjectReferences,
  PathItemObjectSchema, ...PathItemObjectReferences,
  ComponentsObjectSchema, ...ComponentsObjectReferences,
  SecurityRequirementObjectSchema, ...SecurityRequirementObjectReferences,
  TagObjectSchema, ...TagObjectReferences,
  ExternalDocumentationObjectSchema, ...ExternalDocumentationObjectReferences,
  ReferenceObjectSchema, ...ReferenceObjectReferences,
]))

export const isDocumentObject = TypeCompiler.Compile(DocumentObjectSchema, DocumentObjectReferences)
