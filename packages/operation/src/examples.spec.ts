import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  OperationObjectExamples,
  OperationObjectSchema,
  OperationObjectReferences
} from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(OperationObjectSchema, OperationObjectReferences)
  const examples: Array<[number, unknown]> = OperationObjectExamples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
