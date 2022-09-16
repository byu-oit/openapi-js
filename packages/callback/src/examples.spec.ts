import { TypeCompiler } from '@sinclair/typebox/compiler'
import { CallbackObjectReferences, CallbackObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(CallbackObjectSchema, CallbackObjectReferences)
  const examples: Array<[number, any]> = CallbackObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
