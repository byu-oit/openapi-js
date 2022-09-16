import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { MediaTypeObjectSchema } from './schema'
import { MediaType } from './class'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import { ExampleObjectSchema } from '@byu-oit/openapi.example'
import { EncodingObjectSchema } from '@byu-oit/openapi.encoding'

describe('MediaType Class', () => {
  const data = Value.Create(MediaTypeObjectSchema) // Fake schema instantiation
  const ins = MediaType.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [MediaType.prototype.$schema.name, [Value.Create(SchemaObjectSchema)]],
    [MediaType.prototype.$example.name, [Value.Create(Type.String()), Value.Create(ExampleObjectSchema)]],
    [MediaType.prototype.$encoding.name, [Value.Create(Type.String()), Value.Create(EncodingObjectSchema)]]
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
    expect(MediaType.validator.Check(ins.json())).toEqual(true)
  })
})
