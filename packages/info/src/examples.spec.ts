import { TypeCompiler } from '@sinclair/typebox/compiler'
import { InfoObjectReferences, InfoObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(InfoObjectSchema, InfoObjectReferences)
  const examples: Array<[number, any]> = InfoObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
