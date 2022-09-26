import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  EncodingObjectExamples,
  EncodingObjectReferences,
  EncodingObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(EncodingObjectSchema, EncodingObjectReferences)
  const examples: Array<[number, unknown]> = EncodingObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
