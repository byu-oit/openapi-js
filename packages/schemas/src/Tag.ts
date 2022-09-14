import { Type, Static } from '@sinclair/typebox'
import { TExternalDocumentation } from './ExternalDocumentation'

export const TTag = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  externalDoc: Type.Optional(Type.Ref(TExternalDocumentation, { default: TExternalDocumentation.examples[0] }))
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

export type Tag = Static<typeof TTag>
