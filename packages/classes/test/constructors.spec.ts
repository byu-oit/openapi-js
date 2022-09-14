import * as S from '@byu-oit/openapi-schemas'
import { TSchema } from '@sinclair/typebox'
import * as C from '../src'

const table: Array<[string, Function, TSchema]> = [
  [C.Components.name, C.Components, S.TComponents],
  [C.Contact.name, C.Contact, S.TContact],
  [C.Document.name, C.Document, S.TDocument],
  [C.Encoding.name, C.Encoding, S.TEncoding],
  [C.Example.name, C.Example, S.TExample],
  [C.ExternalDocumentation.name, C.ExternalDocumentation, S.TExternalDocumentation],
  [C.Header.name, C.Header, S.THeader],
  [C.Info.name, C.Info, S.TInfo],
  [C.License.name, C.License, S.TLicense],
  [C.Link.name, C.Link, S.TLink],
  [C.MediaType.name, C.MediaType, S.TMediaType],
  [C.OAuthFlow.name, C.OAuthFlow, S.TOauthFlow],
  [C.Operation.name, C.Operation, S.TOperation],
  [C.Parameter.name, C.Parameter, S.TParameter],
  [C.PathItem.name, C.PathItem, S.TPathItem],
  [C.RequestBody.name, C.RequestBody, S.TRequestBody],
  [C.Response.name, C.Response, S.TResponse],
  [C.SecurityScheme.name, C.SecurityScheme, S.TSecurityScheme],
  [C.Server.name, C.Server, S.TServer],
  [C.ServerVariable.name, C.ServerVariable, S.TServerVariable],
  [C.Tag.name, C.Tag, S.TTag]
]
test.concurrent.each(table)('%s constructor validation', (name, Ctr, schema) => {
  const data = schema.examples[schema.examples.length - 1]
  let ins: any
  try {
    // @ts-expect-error
    ins = Ctr.from(data)
    expect(ins.json()).toEqual(data)
  } catch (e) {
    if (e instanceof S.AjvError) {
      expect(e.validations).toBeFalsy()
    } else throw e
  }
})
