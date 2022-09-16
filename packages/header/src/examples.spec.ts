import { TypeCompiler } from '@sinclair/typebox/compiler'
import { HeaderObjectReferences, HeaderObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(HeaderObjectSchema, HeaderObjectReferences)
  const examples: Array<[number, any]> = HeaderObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
