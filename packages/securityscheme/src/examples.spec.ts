import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  SecuritySchemeObjectExamples,
  SecuritySchemeObjectReferences,
  SecuritySchemeObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(SecuritySchemeObjectSchema, SecuritySchemeObjectReferences)
  const examples: Array<[number, unknown]> = SecuritySchemeObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
