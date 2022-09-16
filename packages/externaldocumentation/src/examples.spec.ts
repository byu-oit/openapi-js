import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(ExternalDocumentationObjectSchema, ExternalDocumentationObjectReferences)
  const examples: Array<[number, any]> = ExternalDocumentationObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
