import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { ServerObjectSchema } from './schema'
import { Server } from './class'
import { ServerVariableObjectSchema } from '@byu-oit/openapi.servervariable'

describe('Server Class', () => {
  const data = Value.Create(ServerObjectSchema) // Fake schema instantiation
  const ins = Server.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Server.prototype.$url.name, [Value.Create(Type.String())]],
    [Server.prototype.$description.name, [Value.Create(Type.String())]],
    [Server.prototype.$variable.name, [Value.Create(Type.String()), Value.Create(ServerVariableObjectSchema)]]
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
    expect(Server.validator.Check(ins.json())).toEqual(true)
  })
})
