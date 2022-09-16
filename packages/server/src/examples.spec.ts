import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ServerObjectReferences, ServerObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ServerObjectSchema, ServerObjectReferences)
  const examples: Array<[number, unknown]> = ServerObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
