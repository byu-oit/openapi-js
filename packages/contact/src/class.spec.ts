import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Contact } from './class'
import { ContactObjectSchema } from './schema'

describe('Contact Class', () => {
  const data = Value.Create(ContactObjectSchema) // Fake schema instantiation
  const ins = Contact.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Contact.prototype.$name.name, [Value.Create(Type.String())]],
    [Contact.prototype.$url.name, [Value.Create(Type.String())]],
    [Contact.prototype.$email.name, [Value.Create(Type.String())]]
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
    expect(Contact.validator.Check(ins.json())).toEqual(true)
  })
})
