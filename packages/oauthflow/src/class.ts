import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { isOAuthFlowObject, OAuthFlowObjectType } from './schema'

export class OAuthFlow<T extends OAuthFlowObjectType> extends BaseObject<T> {
  authorizationUrl?: T['authorizationUrl']
  tokenUrl?: T['tokenUrl']
  refreshUrl?: T['refreshUrl']
  scopes: T['scopes']

  constructor (data: T) {
    super()

    if (data.authorizationUrl != null) {
      this.authorizationUrl = data.authorizationUrl
    }

    if (data.tokenUrl != null) {
      this.tokenUrl = data.tokenUrl
    }

    if (data.refreshUrl != null) {
      this.refreshUrl = data.refreshUrl
    }

    this.scopes = data.scopes
  }

  static from<T extends OAuthFlowObjectType = OAuthFlowObjectType> (data: unknown): OAuthFlow<T> {
    const valid = OAuthFlow.validator.Check(data)
    if (!valid) throw new TypeCheckError(OAuthFlow.validator, data)
    return new OAuthFlow(data) as OAuthFlow<T>
  }

  static validator = isOAuthFlowObject

  $authorizationUrl<U extends string> (authorizationUrl: U): OAuthFlow<T & { authorizationUrl: U }> {
    return new OAuthFlow({ ...this.json(), authorizationUrl })
  }

  $tokenUrl<U extends string> (tokenUrl: U): OAuthFlow<T & { tokenUrl: U }> {
    return new OAuthFlow({ ...this.json(), tokenUrl })
  }

  $refreshUrl<U extends string> (refreshUrl: U): OAuthFlow<T & { refreshUrl: U }> {
    return new OAuthFlow({ ...this.json(), refreshUrl })
  }

  $scope<U extends string, V extends string> (name: U, description: V): OAuthFlow<T & { scopes: T['scopes'] & { [P in U]: V } }> {
    const json = this.json()
    const scopes = { ...(json.scopes ?? []), [name]: description } as T['scopes'] & { [P in U]: V }
    return new OAuthFlow({ ...json, scopes })
  }
}
