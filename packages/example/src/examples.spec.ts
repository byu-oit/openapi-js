import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ExampleObjectReferences, ExampleObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ExampleObjectSchema, ExampleObjectReferences)
  const examples: Array<[number, any]> = ExampleObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
