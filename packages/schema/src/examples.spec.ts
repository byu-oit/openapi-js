import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  SchemaObjectExamples,
  SchemaObjectReferences,
  SchemaObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(SchemaObjectSchema, SchemaObjectReferences)
  const examples: Array<[number, unknown]> = SchemaObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
