/* eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access
*/
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { LicenseObjectSchema } from './schema'
import { License } from './class'

describe('License Class', () => {
  const data = Value.Create(LicenseObjectSchema) // Fake schema instantiation
  const ins = License.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [License.prototype.$name.name, [Value.Create(Type.String())]],
    [License.prototype.$identifier.name, [Value.Create(Type.String())]],
    [License.prototype.$url.name, [Value.Create(Type.String())]]
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
    expect(License.validator.Check(ins.json())).toEqual(true)
  })
})
