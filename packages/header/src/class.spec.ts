/* eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access
*/
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { HeaderObjectSchema } from './schema'
import { Header } from './class'
import { ParameterStyleSchema } from '@byu-oit/openapi.parameter'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import { ExampleObjectSchema } from '@byu-oit/openapi.example'

describe('Header Class', () => {
  const data = Value.Create(HeaderObjectSchema) // Fake schema instantiation
  const ins = Header.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Header.prototype.$description.name, [Value.Create(Type.String())]],
    [Header.prototype.$required.name, [!data.required]],
    [Header.prototype.$deprecated.name, [!data.deprecated]],
    [Header.prototype.$allowEmptyValue.name, [!data.allowEmptyValue]],
    [Header.prototype.$style.name, [Value.Create(ParameterStyleSchema)]],
    [Header.prototype.$explode.name, [!data.explode]],
    [Header.prototype.$allowReserved.name, [!data.allowReserved]],
    [Header.prototype.$schema.name, [Value.Create(SchemaObjectSchema)]],
    [Header.prototype.$example.name, [Value.Create(ExampleObjectSchema)]]
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
    expect(Header.validator.Check(ins.json())).toEqual(true)
  })
})
