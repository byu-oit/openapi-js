import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TagObjectReferences, TagObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(TagObjectSchema, TagObjectReferences)
  const examples: Array<[number, any]> = TagObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
