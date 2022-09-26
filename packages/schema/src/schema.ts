import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

// TODO - Consider implementing the JSON Schema specification

export const SchemaObjectExamples: [unknown, ...unknown[]] = [
  {
    type: 'string',
    format: 'email'
  },
  {
    components: {
      schemas: {
        ErrorModel: {
          type: 'object',
          required: [
            'message',
            'code'
          ],
          properties: {
            message: {
              type: 'string'
            },
            code: {
              type: 'integer',
              minimum: 100,
              maximum: 600
            }
          }
        },
        ExtendedErrorModel: {
          allOf: [
            {
              $ref: '#/components/schemas/ErrorModel'
            },
            {
              type: 'object',
              required: [
                'rootCause'
              ],
              properties: {
                rootCause: {
                  type: 'string'
                }
              }
            }
          ]
        }
      }
    }
  }
]

export const SchemaObjectSchema = Type.Unknown({
  $id: 'Schema',
  examples: SchemaObjectExamples
})

export type SchemaObjectType = Static<typeof SchemaObjectSchema>

export const SchemaObjectReferences: TSchema[] = []

export const isSchemaObject = TypeCompiler.Compile(SchemaObjectSchema, SchemaObjectReferences)
