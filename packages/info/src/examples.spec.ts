import { TypeCompiler } from '@sinclair/typebox/compiler'
import { InfoObjectReferences, InfoObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(InfoObjectSchema, InfoObjectReferences)
  const examples: Array<[number, unknown]> = InfoObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
