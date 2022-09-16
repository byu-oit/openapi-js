import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { PathItem, PathItemObjectSchema } from '../PathItem'
import { ServerObjectSchema } from '@byu-oit/openapi.server'
import { ParameterObjectSchema } from '@byu-oit/openapi.parameter'
import { SchemaObjectSchema } from '@byu-oit/openapi.schema'
import { OperationObjectSchema } from '../Operation'

describe('PathItem Class', () => {
  const data = Value.Create(PathItemObjectSchema) // Fake schema instantiation
  const ins = PathItem.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [PathItem.prototype.$summary.name, [Value.Create(Type.String())]],
    [PathItem.prototype.$description.name, [Value.Create(Type.String())]],
    [PathItem.prototype.$server.name, [Value.Create(ServerObjectSchema)]],
    [PathItem.prototype.$parameter.name, [Value.Create(ParameterObjectSchema)], 'parameters'],
    [PathItem.prototype.$query.name, [Value.Create(Type.String()), Value.Create(SchemaObjectSchema)], 'parameters'],
    [PathItem.prototype.$header.name, [Value.Create(Type.String()), Value.Create(SchemaObjectSchema)], 'parameters'],
    [PathItem.prototype.$path.name, [Value.Create(Type.String()), Value.Create(SchemaObjectSchema)], 'parameters'],
    [PathItem.prototype.$cookie.name, [Value.Create(Type.String()), Value.Create(SchemaObjectSchema)], 'parameters'],
    [PathItem.prototype.$get.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$put.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$post.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$delete.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$options.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$head.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$patch.name, [Value.Create(OperationObjectSchema)]],
    [PathItem.prototype.$trace.name, [Value.Create(OperationObjectSchema)]]
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
    expect(PathItem.validator.Check(ins.json())).toEqual(true)
  })
})
