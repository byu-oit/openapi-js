import { TypeCompiler } from '@sinclair/typebox/compiler'
import { LicenseObjectReferences, LicenseObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(LicenseObjectSchema, LicenseObjectReferences)
  const examples: Array<[number, any]> = LicenseObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})