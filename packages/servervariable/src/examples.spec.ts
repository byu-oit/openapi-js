import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ServerVariableObjectReferences, ServerVariableObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ServerVariableObjectSchema, ServerVariableObjectReferences)
  const examples: Array<[number, unknown]> = ServerVariableObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
