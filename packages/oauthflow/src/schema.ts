import { Type, Static, TSchema } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const OAuthGrantTypeExamples: [unknown, ...unknown[]] = [
  'implicit',
  'password',
  'clientCredentials',
  'authorizationCode'
]

export const OAuthGrantTypeSchema = Type.Union([
  Type.Literal('implicit'),
  Type.Literal('password'),
  Type.Literal('clientCredentials'),
  Type.Literal('authorizationCode')
], {
  $id: 'OauthFlowType',
  examples: OAuthGrantTypeExamples
})

export type OAuthGrantTypeType = Static<typeof OAuthGrantTypeSchema>

export const isOAuthGrantType = TypeCompiler.Compile(OAuthGrantTypeSchema)

// TODO - Make OauthFlows for each kind: authorizationCode, clientCredentials

export const OAuthFlowObjectExamples: [unknown, ...unknown[]] = [
  {
    authorizationUrl: 'https://example.com/api/oauth/dialog',
    scopes: {
      'write:pets': 'modify pets in your account',
      'read:pets': 'read your pets'
    }
  },
  {
    authorizationUrl: 'https://example.com/api/oauth/dialog',
    tokenUrl: 'https://example.com/api/oauth/token',
    scopes: {
      'write:pets': 'modify pets in your account',
      'read:pets': 'read your pets'
    }
  }
]

export const OAuthFlowObjectSchema = Type.Object({
  authorizationUrl: Type.Optional(Type.String()),
  tokenUrl: Type.Optional(Type.String()),
  refreshUrl: Type.Optional(Type.String()),
  scopes: Type.Record(Type.String(), Type.String())
}, {
  $id: 'OauthFlow',
  examples: OAuthFlowObjectExamples
})

export type OAuthFlowObjectType = Static<typeof OAuthFlowObjectSchema>

export const OAuthFlowObjectReferences: TSchema[] = []

export const isOAuthFlowObject = TypeCompiler.Compile(OAuthFlowObjectSchema, OAuthFlowObjectReferences)
