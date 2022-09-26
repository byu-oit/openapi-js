import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ReferenceObjectSchema,
  ReferenceObjectReferences,
  ReferenceObjectExamples
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ReferenceObjectSchema, ReferenceObjectReferences)
  const examples: Array<[number, unknown]> = ReferenceObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
