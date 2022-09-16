import { TypeCompiler } from '@sinclair/typebox/compiler'
import { OAuthFlowsObjectReferences, OAuthFlowsObjectSchema } from './schema'

describe('Validates all its examples', () => {
  const C = TypeCompiler.Compile(OAuthFlowsObjectSchema, OAuthFlowsObjectReferences)
  const examples: Array<[number, any]> = OAuthFlowsObjectSchema.examples.map((example, i) => [i, example])

  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => C.Check(example)).not.toThrow()
  })
})
