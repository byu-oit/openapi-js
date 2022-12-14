import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  CallbackObjectExamples,
  CallbackObjectReferences,
  CallbackObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(CallbackObjectSchema, CallbackObjectReferences)
  const examples = CallbackObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
