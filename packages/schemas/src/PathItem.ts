import { Static, TSelf, Type } from '@sinclair/typebox'
import { TReference } from './Reference'
import { TServer } from './Server'
import { TExternalDocumentation } from './ExternalDocumentation'
import { TParameter } from './Parameter'
import { TResponse } from './Response'
import { TSecurityRequirement } from './SecurityRequirement'
import { TRequestBody } from './RequestBody'

export const TMethod = Type.Union([
  Type.Literal('get'),
  Type.Literal('put'),
  Type.Literal('post'),
  Type.Literal('delete'),
  Type.Literal('options'),
  Type.Literal('head'),
  Type.Literal('patch'),
  Type.Literal('trace')
], {
  $id: 'Method',
  examples: [
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace'
  ]
})

export type Method = Static<typeof TMethod>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function TOperation (TPathItem: TSelf) {
  return Type.Object({
    tags: Type.Optional(Type.Array(Type.String())),
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    externalDocs: Type.Optional(Type.Ref(TExternalDocumentation, { default: TExternalDocumentation.examples[0] })),
    operationId: Type.Optional(Type.String()),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TParameter, { default: TParameter.examples[0] })
    ]))),
    requestBody: Type.Optional(Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TRequestBody, { default: TRequestBody.examples[0] })
    ])),
    responses: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TResponse, { default: TResponse.examples[0] })
    ]))),
    callbacks: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      TPathItem
    ]))),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement, { default: TSecurityRequirement.examples[0] }))),
    servers: Type.Optional(Type.Array(Type.Ref(TServer, { default: TServer.examples[0] })))
  })
}

export const TPathItem = Type.Recursive(Self => Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(TServer, { default: TServer.examples[0] }))),
  parameters: Type.Optional(Type.Array(Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TParameter, { default: TParameter.examples[0] })
  ]))),
  get: Type.Optional(TOperation(Self)),
  put: Type.Optional(TOperation(Self)),
  post: Type.Optional(TOperation(Self)),
  delete: Type.Optional(TOperation(Self)),
  options: Type.Optional(TOperation(Self)),
  head: Type.Optional(TOperation(Self)),
  patch: Type.Optional(TOperation(Self)),
  trace: Type.Optional(TOperation(Self))
}), {
  $id: 'PathItem',
  examples: [
    {},
    {
      get: {
        description: 'Returns pets based on ID',
        summary: 'Find pets by ID',
        operationId: 'getPetsById',
        responses: {
          200: {
            description: 'pet response',
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet'
                  }
                }
              }
            }
          },
          default: {
            description: 'error payload',
            content: {
              'text/html': {
                schema: {
                  $ref: '#/components/schemas/ErrorModel'
                }
              }
            }
          }
        }
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of pet to use',
          required: true,
          schema: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          style: 'simple'
        }
      ]
    }
  ]
})

export type PathItem = Static<typeof TPathItem>
