import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(SecurityRequirementObjectSchema, SecurityRequirementObjectReferences)
  const examples: Array<[number, unknown]> = SecurityRequirementObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
