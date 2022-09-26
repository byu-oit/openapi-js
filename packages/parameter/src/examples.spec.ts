import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ParameterObjectExamples,
  ParameterObjectReferences,
  ParameterObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ParameterObjectSchema, ParameterObjectReferences)
  const examples: Array<[number, unknown]> = ParameterObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
