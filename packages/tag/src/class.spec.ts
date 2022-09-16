import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { TagObjectSchema } from './schema'
import { Tag } from './class'
import { ExternalDocumentationObjectSchema } from '@byu-oit/openapi.externaldocumentation'

describe('Tag Class', () => {
  const data = Value.Create(TagObjectSchema) // Fake schema instantiation
  const ins = Tag.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Tag.prototype.$name.name, [Value.Create(Type.String())]],
    [Tag.prototype.$description.name, [Value.Create(Type.String())]],
    [Tag.prototype.$externalDoc.name, [Value.Create(ExternalDocumentationObjectSchema)]]
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
    expect(Tag.validator.Check(ins.json())).toEqual(true)
  })
})
