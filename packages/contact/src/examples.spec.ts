import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ContactObjectExamples,
  ContactObjectReferences,
  ContactObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ContactObjectSchema, ContactObjectReferences)
  const examples: Array<[number, unknown]> = ContactObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
