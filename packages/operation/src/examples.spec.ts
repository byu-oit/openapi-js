import { TypeCompiler } from '@sinclair/typebox/compiler'
import { OperationObjectSchema } from './schema'
import { OperationObjectReferences } from '@byu-oit/openapi.pathitem'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(OperationObjectSchema, OperationObjectReferences)
  const examples: Array<[number, unknown]> = OperationObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
