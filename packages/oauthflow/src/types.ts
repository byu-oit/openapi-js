import { OAuthFlowObjectType, OAuthGrantTypeType } from './schema'
import { OAuthFlow } from './class'

export type ToOAuthFlow<T> = T extends OAuthFlowObjectType ? OAuthFlow<T> : never

export type OAuthFlowRecord<T> = T extends Record<OAuthGrantTypeType, OAuthFlowObjectType>
  ? { [P in keyof T]: ToOAuthFlow<T> }
  : never
