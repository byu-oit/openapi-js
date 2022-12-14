import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ServerObjectExamples,
  ServerObjectReferences,
  ServerObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ServerObjectSchema, ServerObjectReferences)
  const examples: Array<[number, unknown]> = ServerObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
