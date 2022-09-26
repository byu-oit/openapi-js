/* eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access
*/
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import {
  ParameterLocationSchema,
  ParameterObjectSchema,
  ParameterStyleSchema
} from './schema'
import { Parameter } from './class'
import { ExampleObjectSchema } from '@byu-oit/openapi.example'

describe('Parameter Class', () => {
  const data = Value.Create(ParameterObjectSchema) // Fake schema instantiation
  const ins = Parameter.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Parameter.prototype.$name.name, [Value.Create(Type.String())]],
    [Parameter.prototype.$in.name, [Value.Create(ParameterLocationSchema)]],
    [Parameter.prototype.$description.name, [Value.Create(Type.String())]],
    [Parameter.prototype.$required.name, [!data.required]],
    [Parameter.prototype.$deprecated.name, [!data.deprecated]],
    [Parameter.prototype.$allowEmptyValue.name, [!data.allowEmptyValue]],
    [Parameter.prototype.$style.name, [Value.Create(ParameterStyleSchema)]],
    [Parameter.prototype.$explode.name, [!data.explode]],
    [Parameter.prototype.$allowReserved.name, [!data.allowReserved]],
    [Parameter.prototype.$example.name, [Value.Create(ExampleObjectSchema)]]
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
    expect(Parameter.validator.Check(ins.json())).toEqual(true)
  })
})
