/* eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access
*/
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { EncodingObjectSchema } from './schema'
import { Encoding } from './class'
import { HeaderObjectSchema } from '@byu-oit/openapi.header'

describe('Encoding Class', () => {
  const data = Value.Create(EncodingObjectSchema) // Fake schema instantiation
  const ins = Encoding.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Encoding.prototype.$contentType.name, [Value.Create(Type.String())]],
    [Encoding.prototype.$header.name, [Value.Create(Type.String()), Value.Create(HeaderObjectSchema)]],
    [Encoding.prototype.$style.name, [Value.Create(Type.String())]],
    [Encoding.prototype.$explode.name, [!data.explode]],
    [Encoding.prototype.$allowReserved.name, [!data.allowReserved]]
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
    expect(Encoding.validator.Check(ins.json())).toEqual(true)
  })
})
