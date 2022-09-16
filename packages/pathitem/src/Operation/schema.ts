import { Type, Static, TSelf, TSchema } from '@sinclair/typebox'
import {
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import {
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import {
  ParameterObjectReferences,
  ParameterObjectSchema
} from '@byu-oit/openapi.parameter'
import { ResponseObjectReferences, ResponseObjectSchema } from '@byu-oit/openapi.response'
import {
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from '@byu-oit/openapi.securityrequirement'
import { ServerObjectSchema, ServerObjectReferences } from '@byu-oit/openapi.server'
import {
  RequestBodyObjectReferences,
  RequestBodyObjectSchema
} from '@byu-oit/openapi.requestbody'
import { TypeCompiler } from '@sinclair/typebox/compiler'

/**
 * We have to deal with the recursion of this definition by creating an isolated
 * operation schema instead of importing the callback/path-item schema which would
 * create a loop in the dependencies (A depends on B depends on C depends on A).
 *
 * @param OperationObjectSchema
 */
function PathItemObjectSchema (OperationObjectSchema: TSelf) {
  return Type.Object({
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectSchema.examples[0] }))),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
      Type.Ref(ParameterObjectSchema, { default: ParameterObjectSchema.examples[0] })
    ]))),
    get: Type.Optional(OperationObjectSchema),
    put: Type.Optional(OperationObjectSchema),
    post: Type.Optional(OperationObjectSchema),
    delete: Type.Optional(OperationObjectSchema),
    options: Type.Optional(OperationObjectSchema),
    head: Type.Optional(OperationObjectSchema),
    patch: Type.Optional(OperationObjectSchema),
    trace: Type.Optional(OperationObjectSchema)
  })
}

/**
 *
 * @param OperationObjectSchema
 */
function CallbackObjectSchema (OperationObjectSchema: TSelf) {
  return Type.Record(Type.String(), Type.Union([
    Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
    PathItemObjectSchema(OperationObjectSchema)
  ]))
}

export const OperationObjectSchema = Type.Recursive((Self: TSelf) => {
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
    callbacks: Type.Optional(CallbackObjectSchema(Self)),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Ref(SecurityRequirementObjectSchema, { default: SecurityRequirementObjectSchema.examples[0] }))),
    servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectSchema.examples[0] })))
  })
}, {
  $id: 'Operation',
  examples: [
    {},
    {
      tags: [
        'pet'
      ],
      summary: 'Updates a pet in the store with form data',
      operationId: 'updatePetWithForm',
      parameters: [
        {
          name: 'petId',
          in: 'path',
          description: 'ID of pet that needs to be updated',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  description: 'Updated name of the pet',
                  type: 'string'
                },
                status: {
                  description: 'Updated status of the pet',
                  type: 'string'
                }
              },
              required: [
                'status'
              ]
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Pet updated.',
          content: {
            'application/json': {},
            'application/xml': {}
          }
        },
        405: {
          description: 'Method Not Allowed',
          content: {
            'application/json': {},
            'application/xml': {}
          }
        }
      },
      security: [
        {
          petstore_auth: [
            'write:pets',
            'read:pets'
          ]
        }
      ]
    }
  ]
})

export type OperationObjectType = Static<typeof OperationObjectSchema>

export const OperationObjectReferences: TSchema[] = Array.from(new Set([
  ExternalDocumentationObjectSchema, ...ExternalDocumentationObjectReferences,
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  ParameterObjectSchema, ...ParameterObjectReferences,
  ResponseObjectSchema, ...ResponseObjectReferences,
  SecurityRequirementObjectSchema, ...SecurityRequirementObjectReferences,
  ServerObjectSchema, ...ServerObjectReferences,
  RequestBodyObjectSchema, ...RequestBodyObjectReferences
]))

export const isOperationObject = TypeCompiler.Compile(OperationObjectSchema, OperationObjectReferences)
