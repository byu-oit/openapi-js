import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { SecuritySchemeObjectSchema } from './schema'
import { SecurityScheme } from './class'
import { OAuthFlowObjectSchema } from '@byu-oit/openapi.oauthflow'
import { OAuthGrantTypeSchema } from '@byu-oit/openapi.oauthflows'

describe('SecurityScheme Class', () => {
  const data = Value.Create(SecuritySchemeObjectSchema) // Fake schema instantiation
  const ins = SecurityScheme.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [SecurityScheme.prototype.$type.name, [Value.Create(SecuritySchemeObjectSchema)]],
    [SecurityScheme.prototype.$description.name, [Value.Create(Type.String())]],
    [SecurityScheme.prototype.$name.name, [Value.Create(Type.String())]],
    [SecurityScheme.prototype.$in.name, [Value.Create(Type.String())]],
    [SecurityScheme.prototype.$scheme.name, [Value.Create(Type.String())]],
    [SecurityScheme.prototype.$bearerFormat.name, [Value.Create(Type.String())]],
    [SecurityScheme.prototype.$flow.name, [Value.Create(OAuthGrantTypeSchema), Value.Create(OAuthFlowObjectSchema)]],
    [SecurityScheme.prototype.$openIdConnectUrl.name, [Value.Create(Type.String())]]
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
    expect(SecurityScheme.validator.Check(ins.json())).toEqual(true)
  })
})
