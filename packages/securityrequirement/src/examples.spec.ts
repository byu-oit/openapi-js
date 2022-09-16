import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(SecurityRequirementObjectSchema, SecurityRequirementObjectReferences)
  const examples: Array<[number, any]> = SecurityRequirementObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
