import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ExampleObjectReferences, ExampleObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ExampleObjectSchema, ExampleObjectReferences)
  const examples: Array<[number, unknown]> = ExampleObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
