import { Type, Static } from '@sinclair/typebox'
import {
  ReferenceObjectReferences,
  ReferenceObjectSchema
} from '@byu-oit/openapi.reference'
import { PathItemObjectReferences, PathItemObjectSchema } from '../PathItem'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const CallbackObjectSchema = Type.Record(Type.String(), Type.Union([
  Type.Ref(ReferenceObjectSchema, { default: ReferenceObjectSchema.examples[0] }),
  Type.Ref(PathItemObjectSchema, { default: PathItemObjectSchema.examples[0] })
]), {
  $id: 'Callback',
  examples: [
    {},
    {
      myCallback: {
        '{$request.query.queryUrl}': {
          post: {
            requestBody: {
              description: 'Callback payload',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/SomePayload'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'callback successfully processed'
              }
            }
          }
        }
      }
    }
  ]
})

export type CallbackObjectType = Static<typeof CallbackObjectSchema>

export const CallbackObjectReferences = Array.from(new Set([
  ReferenceObjectSchema, ...ReferenceObjectReferences,
  PathItemObjectSchema, ...PathItemObjectReferences
]))

export const isCallbackObject = TypeCompiler.Compile(CallbackObjectSchema, CallbackObjectReferences)
