import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  LicenseObjectExamples,
  LicenseObjectReferences,
  LicenseObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(LicenseObjectSchema, LicenseObjectReferences)
  const examples: Array<[number, unknown]> = LicenseObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
