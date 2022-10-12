import { MediaType, Operation, Response } from '@byu-oit/openapi.document'
import { Type } from '@sinclair/typebox'

export const BasicSchema = Type.Object({
  byu_id: Type.Object({
    value: Type.String(),
    description: Type.String(),
    api_type: Type.String(),
    key: Type.Boolean()
  })
})

export const json = new MediaType({ schema: BasicSchema })

export const BasicResponse = new Response({
  description: 'Person successfully returned',
  content: { ['application/json']: json }
})

export const GetBasicOperation = new Operation({
  responses: {
    200: BasicResponse
  }
})
