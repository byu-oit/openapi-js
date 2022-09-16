import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { OperationObjectSchema } from './schema'
import { Operation } from './class'
import { ExternalDocumentationObjectSchema } from '@byu-oit/openapi.externaldocumentation'
import { ParameterObjectSchema } from '@byu-oit/openapi.parameter'
import { RequestBodyObjectSchema } from '@byu-oit/openapi.requestbody'
import { ResponseObjectSchema } from '@byu-oit/openapi.response'
import { CallbackObjectSchema } from '@byu-oit/openapi.callback'
import { ServerObjectSchema } from '@byu-oit/openapi.server'

describe('Operation Class', () => {
  const data = Value.Create(OperationObjectSchema) // Fake schema instantiation
  const ins = Operation.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [Operation.prototype.$tag.name, [Value.Create(Type.String())]],
    [Operation.prototype.$summary.name, [Value.Create(Type.String())]],
    [Operation.prototype.$description.name, [Value.Create(Type.String())]],
    [Operation.prototype.$externalDocs.name, [Value.Create(ExternalDocumentationObjectSchema)]],
    [Operation.prototype.$operationId.name, [Value.Create(Type.String())]],
    [Operation.prototype.$deprecated.name, [!data.deprecated]],
    [Operation.prototype.$parameter.name, [Value.Create(ParameterObjectSchema)], 'parameters'],
    [Operation.prototype.$body.name, [Value.Create(Type.String()), Value.Create(RequestBodyObjectSchema)], 'requestBody'],
    [Operation.prototype.$response.name, ['default', Value.Create(ResponseObjectSchema)]],
    [Operation.prototype.$callback.name, [Value.Create(Type.String()), Value.Create(CallbackObjectSchema)]],
    [Operation.prototype.$securityRequirement.name, [Value.Create(Type.String()), Value.Create(Type.Array(Type.String()))], 'security'],
    [Operation.prototype.$server.name, [Value.Create(ServerObjectSchema)]]
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
    expect(Operation.validator.Check(ins.json())).toEqual(true)
  })
})
