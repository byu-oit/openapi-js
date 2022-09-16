import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { ExampleObjectSchema } from './schema'
import { Example } from './class'

describe('Example Class', () => {
  const data = Value.Create(ExampleObjectSchema) // Fake schema instantiation
  const ins = Example.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Example.prototype.$summary.name, [Value.Create(Type.String())]],
    [Example.prototype.$description.name, [Value.Create(Type.String())]],
    [Example.prototype.$value.name, [Value.Create(Type.Any())]],
    [Example.prototype.$externalValue.name, [Value.Create(Type.String())]]
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
    expect(Example.validator.Check(ins.json())).toEqual(true)
  })
})
