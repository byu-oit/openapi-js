import { TypeCompiler } from '@sinclair/typebox/compiler'
import { InfoObjectExamples, InfoObjectReferences, InfoObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(InfoObjectSchema, InfoObjectReferences)
  const examples: Array<[number, unknown]> = InfoObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
