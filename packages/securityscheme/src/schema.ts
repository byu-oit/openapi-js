import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  OAuthFlowsObjectReferences,
  OAuthFlowsObjectSchema
} from '@byu-oit/openapi.oauthflows'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const SecuritySchemeTypeSchema = Type.Union([
  Type.Literal('apiKey'),
  Type.Literal('http'),
  Type.Literal('mutualLSObjectSchema'),
  Type.Literal('oauth2'),
  Type.Literal('openIdConnect')
], {
  $id: 'SecuritySchemeType',
  examples: [
    'apiKey',
    'http',
    'mutualLSObjectSchema',
    'oauth2',
    'openIdConnect'
  ]
})

export type SecuritySchemeType = Static<typeof SecuritySchemeTypeSchema>

export const isSecurityScheme = TypeCompiler.Compile(SecuritySchemeTypeSchema)

// TODO - Create different schemas for each of the different types of security schemes
export const SecuritySchemeObjectSchema = Type.Object({
  type: Type.Ref(SecuritySchemeTypeSchema, { default: SecuritySchemeTypeSchema.examples[0] }),
  description: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  in: Type.Optional(Type.String()),
  scheme: Type.Optional(Type.String()),
  bearerFormat: Type.Optional(Type.String()),
  flows: Type.Optional(Type.Ref(OAuthFlowsObjectSchema, { default: OAuthFlowsObjectSchema.examples[0] })),
  openIdConnectUrl: Type.Optional(Type.String())
}, {
  $id: 'SecurityScheme',
  examples: [
    {
      type: 'http',
      scheme: 'basic'
    },
    {
      type: 'apiKey',
      name: 'api_key',
      in: 'header'
    },
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },
    {
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: 'https://example.com/api/oauth/dialog',
          scopes: {
            'write:pets': 'modify pets in your account',
            'read:pets': 'read your pets'
          }
        }
      }
    }
  ]
})

export type SecuritySchemeObjectType = Static<typeof SecuritySchemeObjectSchema>

export const SecuritySchemeObjectReferences: TSchema[] = Array.from(new Set([
  SecuritySchemeTypeSchema,
  OAuthFlowsObjectSchema, ...OAuthFlowsObjectReferences
]))

export const isSecuritySchemeObject = TypeCompiler.Compile(SecuritySchemeObjectSchema, SecuritySchemeObjectReferences)
