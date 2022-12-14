import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  RequestBodyObjectExamples,
  RequestBodyObjectReferences,
  RequestBodyObjectSchema
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(RequestBodyObjectSchema, RequestBodyObjectReferences)
  const examples: Array<[number, unknown]> = RequestBodyObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
