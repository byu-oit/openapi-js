/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as S from '@byu-oit/openapi-schemas'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import * as C from '../src'

describe('Components Class', () => {
  const data = Value.Create(S.TComponents) // Fake schema instantiation
  const ins = C.Components.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Components.prototype.$schema.name, [Value.Create(Type.String()), Value.Create(S.TSchema)]],
    [C.Components.prototype.$response.name, [Value.Create(Type.String()), Value.Create(S.TResponse)]],
    [C.Components.prototype.$parameter.name, [Value.Create(Type.String()), Value.Create(S.TParameter)], 'parameters'],
    [C.Components.prototype.$query.name, [Value.Create(Type.String()), Value.Create(S.TParameter)], 'parameters'],
    [C.Components.prototype.$path.name, [Value.Create(Type.String()), Value.Create(S.TParameter)], 'parameters'],
    [C.Components.prototype.$cookie.name, [Value.Create(Type.String()), Value.Create(S.TParameter)], 'parameters'],
    [C.Components.prototype.$example.name, [Value.Create(Type.String()), Value.Create(S.TExample)]],
    [C.Components.prototype.$body.name, [Value.Create(Type.String()), Value.Create(S.TRequestBody)], 'requestBodies'],
    [C.Components.prototype.$header.name, [Value.Create(Type.String()), Value.Create(S.THeader)]],
    [C.Components.prototype.$securityScheme.name, [Value.Create(Type.String()), Value.Create(S.TSecurityScheme)]],
    [C.Components.prototype.$link.name, [Value.Create(Type.String()), Value.Create(S.TLink)]],
    [C.Components.prototype.$callback.name, [Value.Create(Type.String()), Value.Create(S.TCallback)]],
    [C.Components.prototype.$pathItem.name, [Value.Create(Type.String()), Value.Create(S.TPathItem)]]
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
    expect(C.Components.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Contact Class', () => {
  const data = Value.Create(S.TContact) // Fake schema instantiation
  const ins = C.Contact.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Contact.prototype.$name.name, [Value.Create(Type.String())]],
    [C.Contact.prototype.$url.name, [Value.Create(Type.String())]],
    [C.Contact.prototype.$email.name, [Value.Create(Type.String())]]
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
    expect(C.Contact.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Document Class', () => {
  const data = Value.Create(S.TDocument) // Fake schema instantiation
  const ins = C.Document.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Document.prototype.$openapi.name, ['3.0.0']],
    [C.Document.prototype.$info.name, [Value.Create(S.TInfo)]],
    [C.Document.prototype.$jsonSchemaDialect.name, [Value.Create(Type.String())]],
    [C.Document.prototype.$server.name, [Value.Create(S.TServer)]],
    [C.Document.prototype.$path.name, [Value.Create(Type.String()), Value.Create(S.TPathItem)]],
    [C.Document.prototype.$webhook.name, [Value.Create(Type.String()), Value.Create(S.TPathItem)]],
    [C.Document.prototype.$components.name, [Value.Create(S.TComponents)]],
    [C.Document.prototype.$securityRequirement.name, [Value.Create(Type.String()), Value.Create(S.TSecurityRequirement)], 'security'],
    [C.Document.prototype.$tag.name, [Value.Create(S.TTag)]],
    [C.Document.prototype.$externalDocs.name, [Value.Create(S.TExternalDocumentation)]]
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
    expect(C.Document.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Encoding Class', () => {
  const data = Value.Create(S.TEncoding) // Fake schema instantiation
  const ins = C.Encoding.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Encoding.prototype.$contentType.name, [Value.Create(Type.String())]],
    [C.Encoding.prototype.$header.name, [Value.Create(Type.String()), Value.Create(S.THeader)]],
    [C.Encoding.prototype.$style.name, [Value.Create(Type.String())]],
    [C.Encoding.prototype.$explode.name, [!data.explode]],
    [C.Encoding.prototype.$allowReserved.name, [!data.allowReserved]]
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
    expect(C.Encoding.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Example Class', () => {
  const data = Value.Create(S.TExample) // Fake schema instantiation
  const ins = C.Example.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Example.prototype.$summary.name, [Value.Create(Type.String())]],
    [C.Example.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Example.prototype.$value.name, [Value.Create(Type.Any())]],
    [C.Example.prototype.$externalValue.name, [Value.Create(Type.String())]]
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
    expect(C.Example.validator.validate(ins.json())).toEqual(true)
  })
})

describe('ExternalDocumentation Class', () => {
  const data = Value.Create(S.TExternalDocumentation) // Fake schema instantiation
  const ins = C.ExternalDocumentation.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.ExternalDocumentation.prototype.$url.name, [Value.Create(Type.String())]],
    [C.ExternalDocumentation.prototype.$description.name, [Value.Create(Type.String())]]
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
    expect(C.ExternalDocumentation.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Header Class', () => {
  const data = Value.Create(S.THeader) // Fake schema instantiation
  const ins = C.Header.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Header.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Header.prototype.$required.name, [!data.required]],
    [C.Header.prototype.$deprecated.name, [!data.deprecated]],
    [C.Header.prototype.$allowEmptyValue.name, [!data.allowEmptyValue]],
    [C.Header.prototype.$style.name, [Value.Create(S.TParameterStyle)]],
    [C.Header.prototype.$explode.name, [!data.explode]],
    [C.Header.prototype.$allowReserved.name, [!data.allowReserved]],
    [C.Header.prototype.$schema.name, [Value.Create(S.TSchema)]],
    [C.Header.prototype.$example.name, [Value.Create(S.TExample)]]
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
    expect(C.Header.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Info Class', () => {
  const data = Value.Create(S.TInfo) // Fake schema instantiation
  const ins = C.Info.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Info.prototype.$title.name, [Value.Create(Type.String())]],
    [C.Info.prototype.$summary.name, [Value.Create(Type.String())]],
    [C.Info.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Info.prototype.$termsOfService.name, [Value.Create(Type.String())]],
    [C.Info.prototype.$contact.name, [Value.Create(S.TContact)]],
    [C.Info.prototype.$license.name, [Value.Create(S.TLicense)]],
    [C.Info.prototype.$version.name, [Value.Create(Type.String())]]
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
    expect(C.Info.validator.validate(ins.json())).toEqual(true)
  })
})

describe('License Class', () => {
  const data = Value.Create(S.TLicense) // Fake schema instantiation
  const ins = C.License.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.License.prototype.$name.name, [Value.Create(Type.String())]],
    [C.License.prototype.$identifier.name, [Value.Create(Type.String())]],
    [C.License.prototype.$url.name, [Value.Create(Type.String())]]
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
    expect(C.License.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Link Class', () => {
  const data = Value.Create(S.TLink) // Fake schema instantiation
  const ins = C.Link.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Link.prototype.$operationRef.name, [Value.Create(Type.String())]],
    [C.Link.prototype.$operationId.name, [Value.Create(Type.String())]],
    [C.Link.prototype.$parameter.name, [Value.Create(Type.String()), Value.Create(Type.String())]],
    [C.Link.prototype.$body.name, [Value.Create(S.TSchema)], 'requestBody'],
    [C.Link.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Link.prototype.$server.name, [Value.Create(S.TServer)]]
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
    expect(C.Link.validator.validate(ins.json())).toEqual(true)
  })
})

describe('MediaType Class', () => {
  const data = Value.Create(S.TMediaType) // Fake schema instantiation
  const ins = C.MediaType.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.MediaType.prototype.$schema.name, [Value.Create(S.TSchema)]],
    [C.MediaType.prototype.$example.name, [Value.Create(Type.String()), Value.Create(S.TExample)]],
    [C.MediaType.prototype.$encoding.name, [Value.Create(Type.String()), Value.Create(S.TEncoding)]]
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
    expect(C.MediaType.validator.validate(ins.json())).toEqual(true)
  })
})

describe('OauthFlow Class', () => {
  const data = Value.Create(S.TOauthFlow) // Fake schema instantiation
  const ins = C.OAuthFlow.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.OAuthFlow.prototype.$authorizationUrl.name, [Value.Create(Type.String())]],
    [C.OAuthFlow.prototype.$tokenUrl.name, [Value.Create(Type.String())]],
    [C.OAuthFlow.prototype.$refreshUrl.name, [Value.Create(Type.String())]],
    [C.OAuthFlow.prototype.$scope.name, [Value.Create(Type.String()), Value.Create(Type.String())]]
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
    expect(C.OAuthFlow.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Operation Class', () => {
  const data = Value.Create(S.TOperation) // Fake schema instantiation
  const ins = C.Operation.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Operation.prototype.$tag.name, [Value.Create(Type.String())]],
    [C.Operation.prototype.$summary.name, [Value.Create(Type.String())]],
    [C.Operation.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Operation.prototype.$externalDocs.name, [Value.Create(S.TExternalDocumentation)]],
    [C.Operation.prototype.$operationId.name, [Value.Create(Type.String())]],
    [C.Operation.prototype.$deprecated.name, [!data.deprecated]],
    [C.Operation.prototype.$parameter.name, [Value.Create(S.TParameter)], 'parameters'],
    [C.Operation.prototype.$body.name, [Value.Create(Type.String()), Value.Create(S.TRequestBody)], 'requestBody'],
    [C.Operation.prototype.$response.name, ['default', Value.Create(S.TResponse)]],
    [C.Operation.prototype.$callback.name, [Value.Create(Type.String()), Value.Create(S.TCallback)]],
    [C.Operation.prototype.$securityRequirement.name, [Value.Create(Type.String()), Value.Create(Type.Array(Type.String()))], 'security'],
    [C.Operation.prototype.$server.name, [Value.Create(S.TServer)]]
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
    expect(C.Operation.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Parameter Class', () => {
  const data = Value.Create(S.TParameter) // Fake schema instantiation
  const ins = C.Parameter.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Parameter.prototype.$name.name, [Value.Create(Type.String())]],
    [C.Parameter.prototype.$in.name, [Value.Create(S.TParameterLocation)]],
    [C.Parameter.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Parameter.prototype.$required.name, [!data.required]],
    [C.Parameter.prototype.$deprecated.name, [!data.deprecated]],
    [C.Parameter.prototype.$allowEmptyValue.name, [!data.allowEmptyValue]],
    [C.Parameter.prototype.$style.name, [Value.Create(S.TParameterStyle)]],
    [C.Parameter.prototype.$explode.name, [!data.explode]],
    [C.Parameter.prototype.$allowReserved.name, [!data.allowReserved]],
    [C.Parameter.prototype.$example.name, [Value.Create(S.TExample)]]
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
    expect(C.Parameter.validator.validate(ins.json())).toEqual(true)
  })
})

describe('PathItem Class', () => {
  const data = Value.Create(S.TPathItem) // Fake schema instantiation
  const ins = C.PathItem.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.PathItem.prototype.$summary.name, [Value.Create(Type.String())]],
    [C.PathItem.prototype.$description.name, [Value.Create(Type.String())]],
    [C.PathItem.prototype.$server.name, [Value.Create(S.TServer)]],
    [C.PathItem.prototype.$parameter.name, [Value.Create(S.TParameter)], 'parameters'],
    [C.PathItem.prototype.$query.name, [Value.Create(Type.String()), Value.Create(S.TSchema)], 'parameters'],
    [C.PathItem.prototype.$header.name, [Value.Create(Type.String()), Value.Create(S.TSchema)], 'parameters'],
    [C.PathItem.prototype.$path.name, [Value.Create(Type.String()), Value.Create(S.TSchema)], 'parameters'],
    [C.PathItem.prototype.$cookie.name, [Value.Create(Type.String()), Value.Create(S.TSchema)], 'parameters'],
    [C.PathItem.prototype.$get.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$put.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$post.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$delete.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$options.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$head.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$patch.name, [Value.Create(S.TOperation)]],
    [C.PathItem.prototype.$trace.name, [Value.Create(S.TOperation)]]
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
    expect(C.PathItem.validator.validate(ins.json())).toEqual(true)
  })
})

describe('RequestBody Class', () => {
  const data = Value.Create(S.TRequestBody) // Fake schema instantiation
  const ins = C.RequestBody.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.RequestBody.prototype.$description.name, [Value.Create(Type.String())]],
    [C.RequestBody.prototype.$content.name, ['text/plain', Value.Create(S.TMediaType)]],
    [C.RequestBody.prototype.$json.name, [Value.Create(S.TSchema)], 'content'],
    [C.RequestBody.prototype.$required.name, [!data.required]]
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
    expect(C.RequestBody.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Response Class', () => {
  const data = Value.Create(S.TResponse) // Fake schema instantiation
  const ins = C.Response.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Response.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Response.prototype.$header.name, [Value.Create(S.THeader)]],
    [C.Response.prototype.$content.name, ['text/plain', Value.Create(Type.String()), Value.Create(S.TSchema)]],
    [C.Response.prototype.$link.name, [Value.Create(Type.String()), Value.Create(Type.String())]]
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
    expect(C.Response.validator.validate(ins.json())).toEqual(true)
  })
})

describe('SecurityScheme Class', () => {
  const data = Value.Create(S.TSecurityScheme) // Fake schema instantiation
  const ins = C.SecurityScheme.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.SecurityScheme.prototype.$type.name, [Value.Create(S.TSecuritySchemeType)]],
    [C.SecurityScheme.prototype.$description.name, [Value.Create(Type.String())]],
    [C.SecurityScheme.prototype.$name.name, [Value.Create(Type.String())]],
    [C.SecurityScheme.prototype.$in.name, [Value.Create(Type.String())]],
    [C.SecurityScheme.prototype.$scheme.name, [Value.Create(Type.String())]],
    [C.SecurityScheme.prototype.$bearerFormat.name, [Value.Create(Type.String())]],
    [C.SecurityScheme.prototype.$flow.name, [Value.Create(S.TOauthFlowType), Value.Create(S.TOauthFlow)]],
    [C.SecurityScheme.prototype.$openIdConnectUrl.name, [Value.Create(Type.String())]]
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
    expect(C.SecurityScheme.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Server Class', () => {
  const data = Value.Create(S.TServer) // Fake schema instantiation
  const ins = C.Server.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Server.prototype.$url.name, [Value.Create(Type.String())]],
    [C.Server.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Server.prototype.$variable.name, [Value.Create(Type.String()), Value.Create(S.TServerVariable)]]
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
    expect(C.Server.validator.validate(ins.json())).toEqual(true)
  })
})

describe('ServerVariable Class', () => {
  const data = Value.Create(S.TServerVariable) // Fake schema instantiation
  const ins = C.ServerVariable.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.ServerVariable.prototype.$enum.name, [Value.Create(Type.Array(Type.String()))]],
    [C.ServerVariable.prototype.$default.name, [Value.Create(Type.String())]],
    [C.ServerVariable.prototype.$description.name, [Value.Create(Type.String())]]
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
    expect(C.ServerVariable.validator.validate(ins.json())).toEqual(true)
  })
})

describe('Tag Class', () => {
  const data = Value.Create(S.TTag) // Fake schema instantiation
  const ins = C.Tag.from(data)
  const methods: Array<[string, unknown[], string?]> = [
    [C.Tag.prototype.$name.name, [Value.Create(Type.String())]],
    [C.Tag.prototype.$description.name, [Value.Create(Type.String())]],
    [C.Tag.prototype.$externalDoc.name, [Value.Create(S.TExternalDocumentation)]]
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
    expect(C.Tag.validator.validate(ins.json())).toEqual(true)
  })
})
