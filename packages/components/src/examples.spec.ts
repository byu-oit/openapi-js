import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ExampleObjectExamples,
  ExampleObjectReferences,
  ExampleObjectSchema
} from '@byu-oit/openapi.example'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ExampleObjectSchema, ExampleObjectReferences)
  const examples: Array<[number, unknown]> = ExampleObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
