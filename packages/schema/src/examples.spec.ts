import { TypeCompiler } from '@sinclair/typebox/compiler'
import { SchemaObjectReferences, SchemaObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(SchemaObjectSchema, SchemaObjectReferences)
  const examples: Array<[number, any]> = SchemaObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
