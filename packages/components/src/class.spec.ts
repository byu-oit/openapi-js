import { ComponentsObjectSchema } from './schema'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import { ResponseObjectSchema } from '@byu-oit/openapi.response'
import { ParameterObjectSchema } from '@byu-oit/openapi.parameter'
import { ExampleObjectSchema } from '@byu-oit/openapi.example'
import { RequestBodyObjectSchema } from '@byu-oit/openapi.requestbody'
import { HeaderObjectSchema } from '@byu-oit/openapi.header'
import { SecuritySchemeObjectSchema } from '@byu-oit/openapi.securityscheme'
import { LinkObjectSchema } from '@byu-oit/openapi.link'
import { CallbackObjectSchema } from '@byu-oit/openapi.callback'
import { PathItemObjectSchema } from '@byu-oit/openapi.pathitem'
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Components } from './class'

describe('Components Class', () => {
  const data = Value.Create(ComponentsObjectSchema) // Fake schema instantiation
  const ins = Components.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Components.prototype.$schema.name, [Value.Create(Type.String()), Value.Create(SchemaObjectSchema)]],
    [Components.prototype.$response.name, [Value.Create(Type.String()), Value.Create(ResponseObjectSchema)]],
    [Components.prototype.$parameter.name, [Value.Create(Type.String()), Value.Create(ParameterObjectSchema)], 'parameters'],
    [Components.prototype.$query.name, [Value.Create(Type.String()), Value.Create(ParameterObjectSchema)], 'parameters'],
    [Components.prototype.$path.name, [Value.Create(Type.String()), Value.Create(ParameterObjectSchema)], 'parameters'],
    [Components.prototype.$cookie.name, [Value.Create(Type.String()), Value.Create(ParameterObjectSchema)], 'parameters'],
    [Components.prototype.$example.name, [Value.Create(Type.String()), Value.Create(ExampleObjectSchema)]],
    [Components.prototype.$body.name, [Value.Create(Type.String()), Value.Create(RequestBodyObjectSchema)], 'requestBodies'],
    [Components.prototype.$header.name, [Value.Create(Type.String()), Value.Create(HeaderObjectSchema)]],
    [Components.prototype.$securityScheme.name, [Value.Create(Type.String()), Value.Create(SecuritySchemeObjectSchema)]],
    [Components.prototype.$link.name, [Value.Create(Type.String()), Value.Create(LinkObjectSchema)]],
    [Components.prototype.$callback.name, [Value.Create(Type.String()), Value.Create(CallbackObjectSchema)]],
    [Components.prototype.$pathItem.name, [Value.Create(Type.String()), Value.Create(PathItemObjectSchema)]]
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
    expect(Components.validator.Check(ins.json())).toEqual(true)
  })
})
