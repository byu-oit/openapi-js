import { TypeCompiler } from '@sinclair/typebox/compiler'
import { LinkObjectReferences, LinkObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(LinkObjectSchema, LinkObjectReferences)
  const examples: Array<[number, unknown]> = LinkObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
