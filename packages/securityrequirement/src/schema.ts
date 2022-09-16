import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const SecurityRequirementObjectSchema = Type.Record(Type.String(), Type.Array(Type.String()), {
  $id: 'SecurityRequirement',
  examples: [
    {
      api_key: []
    },
    {
      petstore_auth: [
        'write:pets',
        'read:pets'
      ]
    }
  ]
})

export type SecurityRequirementObjectType = Static<typeof SecurityRequirementObjectSchema>

export const SecurityRequirementObjectReferences = []

export const isSecurityRequirementObject = TypeCompiler.Compile(SecurityRequirementObjectSchema, SecurityRequirementObjectReferences)
