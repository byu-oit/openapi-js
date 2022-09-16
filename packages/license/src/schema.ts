import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const LicenseObjectSchema = Type.Object({
  name: Type.String(),
  identifier: Type.Optional(Type.String()),
  url: Type.Optional(Type.String())
}, {
  $id: 'License',
  examples: [
    {
      name: 'Apache 2.0'
    },
    {
      name: 'Apache 2.0',
      identifier: 'Apache-2.0'
    }
  ]
})

export type LicenseObjectType = Static<typeof LicenseObjectSchema>

export const LicenseObjectReferences = []

export const isLicenseObject = TypeCompiler.Compile(LicenseObjectSchema, LicenseObjectReferences)
