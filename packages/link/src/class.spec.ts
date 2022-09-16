import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { LinkObjectSchema } from './schema'
import { Link } from './class'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import { ServerObjectSchema } from '@byu-oit/openapi.server'

describe('Link Class', () => {
  const data = Value.Create(LinkObjectSchema) // Fake schema instantiation
  const ins = Link.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Link.prototype.$operationRef.name, [Value.Create(Type.String())]],
    [Link.prototype.$operationId.name, [Value.Create(Type.String())]],
    [Link.prototype.$parameter.name, [Value.Create(Type.String()), Value.Create(Type.String())]],
    [Link.prototype.$body.name, [Value.Create(SchemaObjectSchema)], 'requestBody'],
    [Link.prototype.$description.name, [Value.Create(Type.String())]],
    [Link.prototype.$server.name, [Value.Create(ServerObjectSchema)]]
  ]
  test.concurrent.each(methods)('%s does not mutate or mal-format the instance', (method, args, prop) => {
    expect(ins).toHaveProperty(method)
    const updated = ins[method](...args)

    // most props to check are either the singular or plural form of the function name without the beginning '$'
    prop = prop ?? method.slice(1)
    if (!Object.hasOwnProperty.call(updated, prop)) prop += 's'

    expect(updated).toHaveProperty(prop)
    expect(updated[prop]).toBeDefined()
    expect(updated === ins).toEqual(false)
    expect(Link.validator.Check(ins.json())).toEqual(true)
  })
})
