import { Static, TSchema, Type } from '@sinclair/typebox'
import { semver } from '@byu-oit/openapi.common'
import {
  InfoObjectExamples,
  InfoObjectReferences,
  InfoObjectSchema
} from '@byu-oit/openapi.info'
import {
  ServerObjectSchema,
  ServerObjectReferences,
  ServerObjectExamples
} from '@byu-oit/openapi.server'
import {
  PathItemObjectExamples,
  PathItemObjectReferences,
  PathItemObjectSchema
} from '@byu-oit/openapi.pathitem'
import {
  ComponentsObjectExamples,
  ComponentsObjectReferences,
  ComponentsObjectSchema
} from '@byu-oit/openapi.components'
import {
  SecurityRequirementObjectExamples,
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from '@byu-oit/openapi.securityrequirement'
import {
  TagObjectExamples,
  TagObjectReferences,
  TagObjectSchema
} from '@byu-oit/openapi.tag'
import {
  ExternalDocumentationObjectExamples,
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import {
  ReferenceObjectExamples,
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const DocumentObjectExamples: [unknown, ...unknown[]] = [
  {
    openapi: '3.1.0',
    info: {
      title: 'Example API',
      version: '1.0.0'
    }
  },
  // TODO - Extend this example to make it a more robust example
  {
    openapi: '3.1.0',
    info: {
      title: 'Example API',
      version: '1.0.0'
    }
  }
]

export const DocumentObjectSchema = Type.Object({
  openapi: Type.String({ pattern: semver.source, default: '3.1.0' }),
  info: Type.Ref(InfoObjectSchema, { default: InfoObjectExamples[0] }),
  jsonSchemaDialect: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectExamples[0] }))),
  paths: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(PathItemObjectSchema, { default: PathItemObjectExamples[0] })
  ]))),
  webhooks: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(PathItemObjectSchema, { default: PathItemObjectExamples[0] })
  ]))),
  components: Type.Optional(Type.Ref(ComponentsObjectSchema, { default: ComponentsObjectExamples[0] })),
  security: Type.Optional(Type.Array(Type.Ref(SecurityRequirementObjectSchema, { default: SecurityRequirementObjectExamples[0] }))),
  tags: Type.Optional(Type.Array(Type.Ref(TagObjectSchema, { default: TagObjectExamples[0] }))),
  externalDocs: Type.Optional(Type.Ref(ExternalDocumentationObjectSchema, { default: ExternalDocumentationObjectExamples[0] }))
}, {
  $id: 'Document',
  examples: DocumentObjectExamples
})

export type DocumentObjectType = Static<typeof DocumentObjectSchema>

export const DocumentObjectReferences: TSchema[] = Array.from(new Set([
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
