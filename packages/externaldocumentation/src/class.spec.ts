/* eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access
*/
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { ExternalDocumentationObjectSchema } from './schema'
import { ExternalDocumentation } from './class'

describe('ExternalDocumentation Class', () => {
  const data = Value.Create(ExternalDocumentationObjectSchema) // Fake schema instantiation
  const ins = ExternalDocumentation.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [ExternalDocumentation.prototype.$url.name, [Value.Create(Type.String())]],
    [ExternalDocumentation.prototype.$description.name, [Value.Create(Type.String())]]
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
    expect(ExternalDocumentation.validator.Check(ins.json())).toEqual(true)
  })
})
