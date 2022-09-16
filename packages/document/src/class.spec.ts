import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Document } from './class'
import { DocumentObjectSchema } from './schema'
import { InfoObjectSchema } from '@byu-oit/openapi.info'
import { ServerObjectSchema } from '@byu-oit/openapi.server'
import { PathItemObjectSchema } from '@byu-oit/openapi.pathitem'
import { ComponentsObjectSchema } from '@byu-oit/openapi.components'
import { SecuritySchemeObjectSchema } from '@byu-oit/openapi.securityscheme'
import { TagObjectSchema } from '@byu-oit/openapi.tag'
import { ExternalDocumentationObjectSchema } from '@byu-oit/openapi.externaldocumentation'

describe('Document Class', () => {
  const data = Value.Create(DocumentObjectSchema) // Fake schema instantiation
  const ins = Document.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Document.prototype.$openapi.name, ['3.0.0']],
    [Document.prototype.$info.name, [Value.Create(InfoObjectSchema)]],
    [Document.prototype.$jsonSchemaDialect.name, [Value.Create(Type.String())]],
    [Document.prototype.$server.name, [Value.Create(ServerObjectSchema)]],
    [Document.prototype.$path.name, [Value.Create(Type.String()), Value.Create(PathItemObjectSchema)]],
    [Document.prototype.$webhook.name, [Value.Create(Type.String()), Value.Create(PathItemObjectSchema)]],
    [Document.prototype.$components.name, [Value.Create(ComponentsObjectSchema)]],
    [Document.prototype.$securityRequirement.name, [Value.Create(Type.String()), Value.Create(SecuritySchemeObjectSchema)], 'security'],
    [Document.prototype.$tag.name, [Value.Create(TagObjectSchema)]],
    [Document.prototype.$externalDocs.name, [Value.Create(ExternalDocumentationObjectSchema)]]
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
    expect(Document.validator.Check(ins.json())).toEqual(true)
  })
})
