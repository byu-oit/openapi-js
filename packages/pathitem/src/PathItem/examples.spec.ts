import { TypeCompiler } from '@sinclair/typebox/compiler'
import { PathItemObjectReferences, PathItemObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(PathItemObjectSchema, PathItemObjectReferences)
  const examples: Array<[number, any]> = PathItemObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
