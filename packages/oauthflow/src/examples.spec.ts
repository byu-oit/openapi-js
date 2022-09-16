import { TypeCompiler } from '@sinclair/typebox/compiler'
import { OAuthFlowObjectReferences, OAuthFlowObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(OAuthFlowObjectSchema, OAuthFlowObjectReferences)
  const examples: Array<[number, any]> = OAuthFlowObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
