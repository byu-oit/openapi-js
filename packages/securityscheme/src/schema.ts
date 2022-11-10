import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
  OAuthFlowObjectExamples,
  OAuthFlowObjectReferences,
  OAuthFlowObjectSchema,
  OAuthGrantTypeSchema
} from '@byu-oit/openapi.oauthflow'

export const SecuritySchemeTypeExamples: [unknown, ...unknown[]] = [
  'apiKey',
  'http',
  'mutualLSObjectSchema',
  'oauth2',
  'openIdConnect'
]

export const SecuritySchemeTypeSchema = Type.Union([
  Type.Literal('apiKey'),
  Type.Literal('http'),
  Type.Literal('mutualLSObjectSchema'),
  Type.Literal('oauth2'),
  Type.Literal('openIdConnect')
], {
  $id: 'SecuritySchemeType',
  examples: SecuritySchemeTypeExamples
})

export type SecuritySchemeType = Static<typeof SecuritySchemeTypeSchema>

export const isSecurityScheme = TypeCompiler.Compile(SecuritySchemeTypeSchema)

export const SecuritySchemeObjectExamples: [unknown, ...unknown[]] = [
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

// TODO - Create different schemas for each of the different types of security schemes

export const SecuritySchemeObjectSchema = Type.Object({
  type: Type.Ref(SecuritySchemeTypeSchema, { default: SecuritySchemeTypeExamples[0] }),
  description: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  in: Type.Optional(Type.String()),
  scheme: Type.Optional(Type.String()),
  bearerFormat: Type.Optional(Type.String()),
  flows: Type.Optional(Type.Record(OAuthGrantTypeSchema, Type.Optional(Type.Ref(OAuthFlowObjectSchema, { default: OAuthFlowObjectExamples[0] })))),
  openIdConnectUrl: Type.Optional(Type.String())
}, {
  $id: 'SecurityScheme',
  examples: SecuritySchemeObjectExamples
})

export type SecuritySchemeObjectType = Static<typeof SecuritySchemeObjectSchema>

export const SecuritySchemeObjectReferences: TSchema[] = Array.from(new Set([
  SecuritySchemeTypeSchema,
  OAuthFlowObjectSchema, ...OAuthFlowObjectReferences,
  OAuthGrantTypeSchema
]))

export const isSecuritySchemeObject = TypeCompiler.Compile(SecuritySchemeObjectSchema, SecuritySchemeObjectReferences)
