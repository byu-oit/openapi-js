import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  MediaTypeObjectExamples,
  MediaTypeObjectReferences,
  MediaTypeObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(MediaTypeObjectSchema, MediaTypeObjectReferences)
  const examples: Array<[number, unknown]> = MediaTypeObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
