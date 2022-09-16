import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Response } from './class'
import { ResponseObjectSchema } from './schema'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import { HeaderObjectSchema } from '@byu-oit/openapi.header'

describe('Response Class', () => {
  const data = Value.Create(ResponseObjectSchema) // Fake schema instantiation
  const ins = Response.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Response.prototype.$description.name, [Value.Create(Type.String())]],
    [Response.prototype.$header.name, [Value.Create(HeaderObjectSchema)]],
    [Response.prototype.$content.name, ['text/plain', Value.Create(Type.String()), Value.Create(SchemaObjectSchema)]],
    [Response.prototype.$link.name, [Value.Create(Type.String()), Value.Create(Type.String())]]
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
    expect(Response.validator.Check(ins.json())).toEqual(true)
  })
})
