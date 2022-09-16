import {
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import { ServerObjectSchema, ServerObjectReferences } from '@byu-oit/openapi.server'
import {
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import {
  ParameterObjectReferences,
  ParameterObjectSchema
} from '@byu-oit/openapi.parameter'
import { ResponseObjectReferences, ResponseObjectSchema } from '@byu-oit/openapi.response'
import {
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from '@byu-oit/openapi.securityrequirement'
import {
  RequestBodyObjectReferences,
  RequestBodyObjectSchema
} from '@byu-oit/openapi.requestbody'
import { Static, TSchema, TSelf, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const MethodObjectSchema = Type.Union([
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

export type MethodObjectType = Static<typeof MethodObjectSchema>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/**
 *
 * @param PathItemObjectSchema
 */
function OperationObjectSchema (PathItemObjectSchema: TSelf) {
  return Type.Object({
    tags: Type.Optional(Type.Array(Type.String())),
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    externalDocs: Type.Optional(Type.Ref(ExternalDocumentationObjectSchema, { default: ExternalDocumentationObjectSchema.examples[0] })),
    operationId: Type.Optional(Type.String()),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
      Type.Ref(ParameterObjectSchema, { default: ParameterObjectSchema.examples[0] })
    ]))),
    requestBody: Type.Optional(Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
      Type.Ref(RequestBodyObjectSchema, { default: RequestBodyObjectSchema.examples[0] })
    ])),
    responses: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
      Type.Ref(ResponseObjectSchema, { default: ResponseObjectSchema.examples[0] })
    ]))),
    callbacks: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
      PathItemObjectSchema
    ]))),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Ref(SecurityRequirementObjectSchema, { default: SecurityRequirementObjectSchema.examples[0] }))),
    servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectSchema.examples[0] })))
  })
}

export const PathItemObjectSchema = Type.Recursive(Self => Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectSchema.examples[0] }))),
  parameters: Type.Optional(Type.Array(Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    Type.Ref(ParameterObjectSchema, { default: ParameterObjectSchema.examples[0] })
  ]))),
  get: Type.Optional(OperationObjectSchema(Self)),
  put: Type.Optional(OperationObjectSchema(Self)),
  post: Type.Optional(OperationObjectSchema(Self)),
  delete: Type.Optional(OperationObjectSchema(Self)),
  options: Type.Optional(OperationObjectSchema(Self)),
  head: Type.Optional(OperationObjectSchema(Self)),
  patch: Type.Optional(OperationObjectSchema(Self)),
  trace: Type.Optional(OperationObjectSchema(Self))
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

export type PathItemObjectType = Static<typeof PathItemObjectSchema>

export const PathItemObjectReferences: TSchema[] = Array.from(
  new Set([
    ReferenceObjectSchema, ...ReferenceObjectReferences,
    ServerObjectSchema, ...ServerObjectReferences,
    ExternalDocumentationObjectSchema, ...ExternalDocumentationObjectReferences,
    ParameterObjectSchema, ...ParameterObjectReferences,
    ResponseObjectSchema, ...ResponseObjectReferences,
    SecurityRequirementObjectSchema, ...SecurityRequirementObjectReferences,
    RequestBodyObjectSchema, ...RequestBodyObjectReferences
  ])
)

export const isPathItemObject = TypeCompiler.Compile(PathItemObjectSchema, PathItemObjectReferences)
