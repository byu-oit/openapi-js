import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ResponseObjectExamples,
  ResponseObjectReferences,
  ResponseObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ResponseObjectSchema, ResponseObjectReferences)
  const examples: Array<[number, unknown]> = ResponseObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
