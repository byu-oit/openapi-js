import { Type, Static } from '@sinclair/typebox'
import { TContact } from './Contact'
import { TLicense } from './License'
import { regex } from './util/semver'

export const TInfo = Type.Object({
  title: Type.String(),
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  termsOfService: Type.Optional(Type.String()),
  contact: Type.Optional(Type.Ref(TContact, { default: TContact.examples[0] })),
  license: Type.Optional(Type.Ref(TLicense, { default: TLicense.examples[0] })),
  version: Type.String({ pattern: regex.source, default: '1.0.0' })
}, {
  $id: 'Info',
  examples: [
    {
      title: 'Example API',
      version: '1.0.0'
    },
    {
      title: 'Sample Pet Store App',
      summary: 'A pet store manager.',
      description: 'This is a sample server for a pet store.',
      termsOfService: 'https://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'https://www.example.com/support',
        email: 'support@example.com'
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      },
      version: '1.0.1'
    }
  ]
})

export type Info = Static<typeof TInfo>
