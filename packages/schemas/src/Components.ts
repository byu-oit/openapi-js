import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './Schema'
import { TReference } from './Reference'
import { TResponse } from './Response'
import { TParameter } from './Parameter'
import { TExample } from './Example'
import { TRequestBody } from './RequestBody'
import { THeader } from './Header'
import { TSecurityScheme } from './SecurityScheme'
import { TLink } from './Link'
import { TCallback } from './Callback'
import { TPathItem } from './PathItem'

export const TComponents = Type.Object({
  schemas: Type.Optional(Type.Record(Type.String(), Type.Ref(TSchema))),
  responses: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TResponse, { default: TResponse.examples[0] })
  ]))),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TParameter, { default: TParameter.examples[0] })
  ]))),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TExample, { default: TExample.examples[0] })
  ]))),
  requestBodies: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TRequestBody, { default: TRequestBody.examples[0] })
  ]))),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(THeader, { default: THeader.examples[0] })
  ]))),
  securitySchemes: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TSecurityScheme, { default: TSecurityScheme.examples[0] })
  ]))),
  links: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TLink, { default: TLink.examples[0] })
  ]))),
  callbacks: Type.Optional(Type.Ref(TCallback, { default: TCallback.examples[0] })),
  pathItems: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TPathItem, { default: TPathItem.examples[0] })
  ])))
}, {
  $id: 'Components',
  examples: [
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
})

/*
TODO: All the fixed fields declared above are objects that MUST use keys that match the regular expression: ^[a-zA-Z0-9\.\-_]+$.
Field Name Examples:

User
User_1
User_Name
user-name
my.org.User
*/

export type Components = Static<typeof TComponents>
