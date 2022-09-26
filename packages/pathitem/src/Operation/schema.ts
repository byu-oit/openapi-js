import { Type, Static, TSelf, TSchema } from '@sinclair/typebox'
import {
  ExternalDocumentationObjectExamples,
  ExternalDocumentationObjectReferences,
  ExternalDocumentationObjectSchema
} from '@byu-oit/openapi.externaldocumentation'
import {
  ReferenceObjectExamples,
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import {
  ParameterObjectExamples,
  ParameterObjectReferences,
  ParameterObjectSchema
} from '@byu-oit/openapi.parameter'
import {
  ResponseObjectExamples,
  ResponseObjectReferences,
  ResponseObjectSchema
} from '@byu-oit/openapi.response'
import {
  SecurityRequirementObjectExamples,
  SecurityRequirementObjectReferences,
  SecurityRequirementObjectSchema
} from '@byu-oit/openapi.securityrequirement'
import {
  ServerObjectSchema,
  ServerObjectReferences,
  ServerObjectExamples
} from '@byu-oit/openapi.server'
import {
  RequestBodyObjectExamples,
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
    servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectExamples[0] }))),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(ParameterObjectSchema, { default: ParameterObjectExamples[0] })
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

export const OperationObjectExamples: [unknown, ...unknown[]] = [
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

export const OperationObjectSchema = Type.Recursive((Self: TSelf) => {
  return Type.Object({
    tags: Type.Optional(Type.Array(Type.String())),
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    externalDocs: Type.Optional(Type.Ref(ExternalDocumentationObjectSchema, { default: ExternalDocumentationObjectExamples[0] })),
    operationId: Type.Optional(Type.String()),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(ParameterObjectSchema, { default: ParameterObjectExamples[0] })
    ]))),
    requestBody: Type.Optional(Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(RequestBodyObjectSchema, { default: RequestBodyObjectExamples[0] })
    ])),
    responses: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      Type.Ref(ResponseObjectSchema, { default: ResponseObjectExamples[0] })
    ]))),
    callbacks: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectExamples[0] }),
      PathItemObjectSchema(Self)
    ]))),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Ref(SecurityRequirementObjectSchema, { default: SecurityRequirementObjectExamples[0] }))),
    servers: Type.Optional(Type.Array(Type.Ref(ServerObjectSchema, { default: ServerObjectExamples[0] })))
  })
}, {
  $id: 'Operation',
  examples: OperationObjectExamples
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
