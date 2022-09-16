import { semver } from '@byu-oit/openapi.common'
import { Type, Static } from '@sinclair/typebox'
import { ContactObjectReferences, ContactObjectSchema } from '@byu-oit/openapi.contact'
import { LicenseObjectReferences, LicenseObjectSchema } from '@byu-oit/openapi.license'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const InfoObjectSchema = Type.Object({
  title: Type.String(),
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  termsOfService: Type.Optional(Type.String()),
  contact: Type.Optional(Type.Ref(ContactObjectSchema, { default: ContactObjectSchema.examples[0] })),
  license: Type.Optional(Type.Ref(LicenseObjectSchema, { default: LicenseObjectSchema.examples[0] })),
  version: Type.String({ pattern: semver.source, default: '1.0.0' })
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

export type InfoObjectType = Static<typeof InfoObjectSchema>

export const InfoObjectReferences = [
  ContactObjectSchema, ...ContactObjectReferences,
  LicenseObjectSchema, ...LicenseObjectReferences
]

export const isInfoObject = TypeCompiler.Compile(InfoObjectSchema, InfoObjectReferences)
