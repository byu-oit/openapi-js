import { Type, Static } from '@sinclair/typebox'
import {
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TagObjectSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  externalDoc: Type.Optional(Type.Ref(ExternalDocumentationObjectSchema, { default: ExternalDocumentationObjectSchema.examples[0] }))
}, {
  $id: 'Tag',
  examples: [
    { name: 'Resource' },
    {
      name: 'Resource',
      description: 'A subresource tag example',
      externalDoc: {
        url: 'https://example.com/resource'
      }
    }
  ]
})

export type TagObjectType = Static<typeof TagObjectSchema>

export const TagObjectReferences = Array.from(new Set([
  ExternalDocumentationObjectSchema, ...ExternalDocumentationObjectReferences
]))

export const isTagObject = TypeCompiler.Compile(TagObjectSchema, TagObjectReferences)
