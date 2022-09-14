import { Type, Static } from '@sinclair/typebox'

// TODO - Make OauthFlows for each kind: authorizationCode, clientCredentials
export const TOAuthFlow = Type.Object({
  authorizationUrl: Type.Optional(Type.String()),
  tokenUrl: Type.Optional(Type.String()),
  refreshUrl: Type.Optional(Type.String()),
  scopes: Type.Record(Type.String(), Type.String())
}, {
  $id: 'OauthFlow',
  examples: [
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
})

export type OAuthFlow = Static<typeof TOAuthFlow>
