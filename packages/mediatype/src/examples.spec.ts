import { TypeCompiler } from '@sinclair/typebox/compiler'
import { MediaTypeObjectReferences, MediaTypeObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(MediaTypeObjectSchema, MediaTypeObjectReferences)
  const examples: Array<[number, any]> = MediaTypeObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
