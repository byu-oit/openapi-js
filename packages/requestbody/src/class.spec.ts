import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { RequestBodyObjectSchema } from './schema'
import { RequestBody } from './class'
import { MediaTypeObjectSchema } from '@byu-oit/openapi.mediatype'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'

describe('RequestBody Class', () => {
  const data = Value.Create(RequestBodyObjectSchema) // Fake schema instantiation
  const ins = RequestBody.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [RequestBody.prototype.$description.name, [Value.Create(Type.String())]],
    [RequestBody.prototype.$content.name, ['text/plain', Value.Create(MediaTypeObjectSchema)]],
    [RequestBody.prototype.$json.name, [Value.Create(SchemaObjectSchema)], 'content'],
    [RequestBody.prototype.$required.name, [!data.required]]
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
    expect(RequestBody.validator.Check(ins.json())).toEqual(true)
  })
})
