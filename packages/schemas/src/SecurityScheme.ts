import { Type, Static } from '@sinclair/typebox'
import { TOAuthFlows } from './OAuthFlows'

export const TSecuritySchemeType = Type.Union([
  Type.Literal('apiKey'),
  Type.Literal('http'),
  Type.Literal('mutualTLS'),
  Type.Literal('oauth2'),
  Type.Literal('openIdConnect')
], {
  $id: 'SecuritySchemeType',
  examples: [
    'apiKey',
    'http',
    'mutualTLS',
    'oauth2',
    'openIdConnect'
  ]
})

export type SecuritySchemeType = Static<typeof TSecuritySchemeType>

// TODO - Create different schemas for each of the different types of security schemes
export const TSecurityScheme = Type.Object({
  type: Type.Ref(TSecuritySchemeType, { default: TSecuritySchemeType.examples[0] }),
  description: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  in: Type.Optional(Type.String()),
  scheme: Type.Optional(Type.String()),
  bearerFormat: Type.Optional(Type.String()),
  flows: Type.Optional(Type.Ref(TOAuthFlows, { default: TOAuthFlows.examples[0] })),
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

export type SecurityScheme = Static<typeof TSecurityScheme>
