import { DocumentObjectSchema, DocumentObjectReferences, DocumentObjectExamples } from '../src'
import { TypeCompiler } from '@sinclair/typebox/compiler'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(DocumentObjectSchema, DocumentObjectReferences)
  const examples: Array<[number, unknown]> = DocumentObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
