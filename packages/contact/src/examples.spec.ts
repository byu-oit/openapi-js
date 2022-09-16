import { TypeCompiler } from '@sinclair/typebox/compiler'
import { ContactObjectReferences, ContactObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ContactObjectSchema, ContactObjectReferences)
  const examples: Array<[number, any]> = ContactObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
