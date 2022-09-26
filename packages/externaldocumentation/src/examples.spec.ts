import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ExternalDocumentationObjectExamples,
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ExternalDocumentationObjectSchema, ExternalDocumentationObjectReferences)
  const examples: Array<[number, unknown]> = ExternalDocumentationObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
