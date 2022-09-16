import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { OAuthFlowObjectSchema } from './schema'
import { OAuthFlow } from './class'

describe('OauthFlow Class', () => {
  const data = Value.Create(OAuthFlowObjectSchema) // Fake schema instantiation
  const ins = OAuthFlow.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [OAuthFlow.prototype.$authorizationUrl.name, [Value.Create(Type.String())]],
    [OAuthFlow.prototype.$tokenUrl.name, [Value.Create(Type.String())]],
    [OAuthFlow.prototype.$refreshUrl.name, [Value.Create(Type.String())]],
    [OAuthFlow.prototype.$scope.name, [Value.Create(Type.String()), Value.Create(Type.String())]]
  ]
  test.concurrent.each(methods)('%s does not mutate or mal-format the instance', (method, args, prop) => {
    expect(ins).toHaveProperty(method)
    // @ts-ignore
    const updated = ins[method](...args)

    // most props to check are either the singular or plural form of the function name without the beginning '$'
    prop = prop ?? method.slice(1)
    if (!Object.hasOwnProperty.call(updated, prop)) prop += 's'

    expect(updated).toHaveProperty(prop)
    expect(updated[prop]).toBeDefined()
    expect(updated === ins).toEqual(false)
    expect(OAuthFlow.validator.Check(ins.json())).toEqual(true)
  })
})
