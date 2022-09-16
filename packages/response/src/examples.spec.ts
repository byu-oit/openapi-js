import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ResponseObjectReferences, ResponseObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ResponseObjectSchema, ResponseObjectReferences)
  const examples: Array<[number, any]> = ResponseObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
