import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ServerVariableObjectReferences, ServerVariableObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ServerVariableObjectSchema, ServerVariableObjectReferences)
  const examples: Array<[number, any]> = ServerVariableObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
