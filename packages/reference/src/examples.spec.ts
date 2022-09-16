import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ReferenceObjectSchema, ReferenceObjectReferences } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ReferenceObjectSchema, ReferenceObjectReferences)
  const examples: Array<[number, any]> = ReferenceObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})