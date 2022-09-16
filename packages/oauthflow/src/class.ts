import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { isOAuthFlowObject, OAuthFlowObjectType } from './schema'

export class OAuthFlow<T extends OAuthFlowObjectType> extends Base implements OAuthFlowObjectType {
  authorizationUrl!: T['authorizationUrl']
  tokenUrl!: T['tokenUrl']
  refreshUrl?: T['refreshUrl']
  scopes!: T['scopes']

  constructor (data: T) {
    super()
    Object.assign(this, data)
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

  $scope<U extends string> (name: U, description: string): OAuthFlow<T & { scopes: Merge<T['scopes'], { [P in U]: string }> }> {
    const scopes = { ...this.scopes, [name]: description }
    return new OAuthFlow({ ...this.json(), scopes })
  }
}
