import { Type, Static, TSchema } from '@sinclair/typebox'
import { SchemaObjectReferences, SchemaObjectSchema } from '@byu-oit/openapi.schema'
import {
  ReferenceObjectExamples,
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import {
  ResponseObjectExamples,
  ResponseObjectReferences,
  ResponseObjectSchema
} from '@byu-oit/openapi.response'
import {
  ParameterObjectExamples,
  ParameterObjectReferences,
  ParameterObjectSchema
} from '@byu-oit/openapi.parameter'
import {
  ExampleObjectExamples,
  ExampleObjectReferences,
  ExampleObjectSchema
} from '@byu-oit/openapi.example'
import {
  RequestBodyObjectExamples,
  RequestBodyObjectReferences,
  RequestBodyObjectSchema
} from '@byu-oit/openapi.requestbody'
import {
  HeaderObjectExamples,
  HeaderObjectReferences,
  HeaderObjectSchema
} from '@byu-oit/openapi.header'
import {
  SecuritySchemeObjectExamples,
  SecuritySchemeObjectReferences,
  SecuritySchemeObjectSchema
} from '@byu-oit/openapi.securityscheme'
import {
  LinkObjectExamples,
  LinkObjectReferences,
  LinkObjectSchema
} from '@byu-oit/openapi.link'
import {
  CallbackObjectExamples,
  CallbackObjectReferences,
  CallbackObjectSchema
} from '@byu-oit/openapi.callback'
import {
  PathItemObjectExamples,
  PathItemObjectReferences,
  PathItemObjectSchema
} from '@byu-oit/openapi.pathitem'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const ComponentsObjectExamples: [unknown, ...unknown[]] = [
  {},
  {
    schemas: {
      GeneralError: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            format: 'int32'
          },
          message: {
            type: 'string'
          }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          name: {
            type: 'string'
          }
        }
      },
      Tag: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          name: {
            type: 'string'
          }
        }
      }
    },
    parameters: {
      skipParam: {
        name: 'skip',
        in: 'query',
        description: 'number of items to skip',
        required: true,
        schema: {
          type: 'integer',
          format: 'int32'
        }
      },
      limitParam: {
        name: 'limit',
        in: 'query',
        description: 'max records to return',
        required: true,
        schema: {
          type: 'integer',
          format: 'int32'
        }
      }
    },
    responses: {
      NotFound: {
        description: 'Entity not found.'
      },
      IllegalInput: {
        description: 'Illegal input for operation.'
      },
      GeneralError: {
        description: 'General Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GeneralError'
            }
          }
        }
      }
    },
    securitySchemes: {
      api_key: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header'
      },
      petstore_auth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://example.org/api/oauth/dialog',
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets'
            }
          }
        }
      }
    }
  }
]

export const ComponentsObjectSchema = Type.Object({
  schemas: Type.Optional(Type.Record(Type.String(), Type.Ref(SchemaObjectSchema))),
  responses: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(ResponseObjectSchema, { default: ResponseObjectExamples[0] })
  ]))),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(ParameterObjectSchema, { default: ParameterObjectExamples[0] })
  ]))),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(ExampleObjectSchema, { default: ExampleObjectExamples[0] })
  ]))),
  requestBodies: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(RequestBodyObjectSchema, { default: RequestBodyObjectExamples[0] })
  ]))),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(HeaderObjectSchema, { default: HeaderObjectExamples[0] })
  ]))),
  securitySchemes: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(SecuritySchemeObjectSchema, { default: SecuritySchemeObjectExamples[0] })
  ]))),
  links: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(LinkObjectSchema, { default: LinkObjectExamples[0] })
  ]))),
  callbacks: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(CallbackObjectSchema, { default: CallbackObjectExamples[0] })
    ]))),
  pathItems: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
    Type.Ref(PathItemObjectSchema, { default: PathItemObjectExamples[0] })
  ])))
}, {
  $id: 'Components',
  examples: ComponentsObjectExamples
})

/*
TODO: All the fixed fields declared above are objects that MUST use keys that match the
 regular expression: ^[a-zA-Z0-9\.\-_]+$.
Field Name Examples:

User
User_1
User_Name
user-name
my.org.User
*/

export type ComponentsObjectType = Static<typeof ComponentsObjectSchema>

export const ComponentsObjectReferences: TSchema[] = Array.from(new Set([
  SchemaObjectSchema, ...SchemaObjectReferences,
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  ResponseObjectSchema, ...ResponseObjectReferences,
  ParameterObjectSchema, ...ParameterObjectReferences,
  ExampleObjectSchema, ...ExampleObjectReferences,
  RequestBodyObjectSchema, ...RequestBodyObjectReferences,
  HeaderObjectSchema, ...HeaderObjectReferences,
  SecuritySchemeObjectSchema, ...SecuritySchemeObjectReferences,
  LinkObjectSchema, ...LinkObjectReferences,
  CallbackObjectSchema, ...CallbackObjectReferences,
  PathItemObjectSchema, ...PathItemObjectReferences
]))

export const isComponentsObject = TypeCompiler.Compile(ComponentsObjectSchema, ComponentsObjectReferences)
