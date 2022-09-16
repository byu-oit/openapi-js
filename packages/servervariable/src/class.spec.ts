import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { ServerVariableObjectSchema } from './schema'
import { ServerVariable } from './class'

describe('ServerVariable Class', () => {
  const data = Value.Create(ServerVariableObjectSchema) // Fake schema instantiation
  const ins = ServerVariable.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [ServerVariable.prototype.$enum.name, [Value.Create(Type.Array(Type.String()))]],
    [ServerVariable.prototype.$default.name, [Value.Create(Type.String())]],
    [ServerVariable.prototype.$description.name, [Value.Create(Type.String())]]
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
    expect(ServerVariable.validator.Check(ins.json())).toEqual(true)
  })
})
