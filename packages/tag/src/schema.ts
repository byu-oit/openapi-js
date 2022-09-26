import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  ExternalDocumentationObjectExamples,
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TagObjectExamples: [unknown, ...unknown[]] = [
  { name: 'Resource' },
  {
    name: 'Resource',
    description: 'A subresource tag example',
    externalDoc: {
      url: 'https://example.com/resource'
    }
  }
]

export const TagObjectSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  externalDoc: Type.Optional(Type.Ref(ExternalDocumentationObjectSchema, { default: ExternalDocumentationObjectExamples[0] }))
}, {
  $id: 'Tag',
  examples: TagObjectExamples
})

export type TagObjectType = Static<typeof TagObjectSchema>

export const TagObjectReferences: TSchema[] = Array.from(new Set([
  ExternalDocumentationObjectSchema, ...ExternalDocumentationObjectReferences
]))

export const isTagObject = TypeCompiler.Compile(TagObjectSchema, TagObjectReferences)
