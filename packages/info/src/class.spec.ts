/* eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access
*/
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { InfoObjectSchema } from './schema'
import { Info } from './class'
import { ContactObjectSchema } from '@byu-oit/openapi.contact'
import { LicenseObjectSchema } from '@byu-oit/openapi.license'

describe('Info Class', () => {
  const data = Value.Create(InfoObjectSchema) // Fake schema instantiation
  const ins = Info.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Info.prototype.$title.name, [Value.Create(Type.String())]],
    [Info.prototype.$summary.name, [Value.Create(Type.String())]],
    [Info.prototype.$description.name, [Value.Create(Type.String())]],
    [Info.prototype.$termsOfService.name, [Value.Create(Type.String())]],
    [Info.prototype.$contact.name, [Value.Create(ContactObjectSchema)]],
    [Info.prototype.$license.name, [Value.Create(LicenseObjectSchema)]],
    [Info.prototype.$version.name, [Value.Create(Type.String())]]
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
    expect(Info.validator.Check(ins.json())).toEqual(true)
  })
})
