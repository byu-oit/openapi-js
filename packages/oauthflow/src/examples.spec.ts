import { TypeCompiler } from '@sinclair/typebox/compiler'
import { OAuthFlowObjectReferences, OAuthFlowObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(OAuthFlowObjectSchema, OAuthFlowObjectReferences)
  const examples: Array<[number, unknown]> = OAuthFlowObjectSchema.examples.map((example: unknown, i: number) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
