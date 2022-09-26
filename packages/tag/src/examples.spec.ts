import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TagObjectExamples, TagObjectReferences, TagObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(TagObjectSchema, TagObjectReferences)
  const examples: Array<[number, unknown]> = TagObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
