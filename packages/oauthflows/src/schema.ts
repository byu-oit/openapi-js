import { Type, Static, TSchema } from '@sinclair/typebox'
import {
  OAuthFlowObjectReferences,
  OAuthFlowObjectSchema
} from '@byu-oit/openapi.oauthflow'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const OAuthGrantTypeSchema = Type.Union([
  Type.Literal('implicit'),
  Type.Literal('password'),
  Type.Literal('clientCredentials'),
  Type.Literal('authorizationCode')
], {
  $id: 'OauthFlowType',
  examples: [
    'implicit',
    'password',
    'clientCredentials',
    'authorizationCode'
  ]
})

export type OAuthGrantTypeType = Static<typeof OAuthGrantTypeSchema>

export const isOAuthGrantType = TypeCompiler.Compile(OAuthGrantTypeSchema)

export const OAuthFlowsObjectSchema = Type.Object({
  implicit: Type.Optional(Type.Ref(OAuthFlowObjectSchema, { default: OAuthFlowObjectSchema.examples[0] })),
  password: Type.Optional(Type.Ref(OAuthFlowObjectSchema, { default: OAuthFlowObjectSchema.examples[0] })),
  clientCredentials: Type.Optional(Type.Ref(OAuthFlowObjectSchema, { default: OAuthFlowObjectSchema.examples[0] })),
  authorizationCode: Type.Optional(Type.Ref(OAuthFlowObjectSchema, { default: OAuthFlowObjectSchema.examples[0] }))
}, {
  $id: 'OauthFlows',
  examples: [
    {
      implicit: {
        authorizationUrl: 'https://example.com/api/oauth/dialog',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets'
        }
      },
      authorizationCode: {
        authorizationUrl: 'https://example.com/api/oauth/dialog',
        tokenUrl: 'https://example.com/api/oauth/token',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets'
        }
      }
    }
  ]
})

export type OAuthFlowsObjectType = Static<typeof OAuthFlowsObjectSchema>

export const OAuthFlowsObjectReferences: TSchema[] = Array.from(new Set([
  OAuthFlowObjectSchema, ...OAuthFlowObjectReferences
]))

export const isOAuthFlowsObject = TypeCompiler.Compile(OAuthFlowsObjectSchema, OAuthFlowsObjectReferences)
