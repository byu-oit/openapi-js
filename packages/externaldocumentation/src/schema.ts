import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ExternalDocumentationObjectExamples: [unknown, ...unknown[]] = [
  {
    url: 'https://example.com'
  },
  {
    description: 'Find more info here',
    url: 'https://example.com'
  }
]

export const ExternalDocumentationObjectSchema = Type.Object({
  description: Type.Optional(Type.String()),
  url: Type.String()
}, {
  $id: 'ExternalDocumentation',
  examples: ExternalDocumentationObjectExamples
})

export type ExternalDocumentationObjectType = Static<typeof ExternalDocumentationObjectSchema>

export const ExternalDocumentationObjectReferences: TSchema[] = []

export const isExternalDocumentationObject = TypeCompiler.Compile(ExternalDocumentationObjectSchema, ExternalDocumentationObjectReferences)
