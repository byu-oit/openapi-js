import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { isOAuthFlowObject, OAuthFlowObjectType } from './schema'

/**
 * Configuration details for a supported OAuth Flow
 * 
 * {@link https://spec.openapis.org/oas/latest#oauth-flow-object}
 */
export class OAuthFlow<T extends OAuthFlowObjectType> extends BaseObject<T> {

  /**
   * REQUIRED. The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-24}
   */
  authorizationUrl?: T['authorizationUrl']
  
  /**
   * REQUIRED. The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-24}
   */
  tokenUrl?: T['tokenUrl']
  
  /**
   * The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-24}
   */
  refreshUrl?: T['refreshUrl']
  
  /**
   * REQUIRED. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-24}
   */
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

  /**
   * Creates a copy of the instance with the authorizationUrl added.
   * 
   * @template T, U
   * @param {U} authorizationUrl The authorizationUrl to be added to the OAuthFlow object.
   * @returns {OAuthFlow<T & { authorizationUrl: U }>}
   */
  $authorizationUrl<U extends string> (authorizationUrl: U): OAuthFlow<T & { authorizationUrl: U }> {
    return new OAuthFlow({ ...this.json(), authorizationUrl })
  }

  /**
   * Creates a copy of the instance with the tokenUrl added.
   * 
   * @template T, U
   * @param {U} tokenUrl The tokenUrl to be added to the OAuthFlow object. 
   * @returns {OAuthFlow<T & { tokenUrl: U }>}
   */
  $tokenUrl<U extends string> (tokenUrl: U): OAuthFlow<T & { tokenUrl: U }> {
    return new OAuthFlow({ ...this.json(), tokenUrl })
  }

  /**
   * Creates a copy of the instance with the refreshUrl added.
   * 
   * @template T, U
   * @param {U} refreshUrl The refreshUrl to be added to the OAuthFlow object.
   * @returns {OAuthFlow<T & { refreshUrl: U }>}
   */
  $refreshUrl<U extends string> (refreshUrl: U): OAuthFlow<T & { refreshUrl: U }> {
    return new OAuthFlow({ ...this.json(), refreshUrl })
  }

  /**
   * Creates a copy of the instance with the scope added.
   * 
   * @template T, U, V, P
   * @param {U} name The name to be added to the OAuthFlow object.
   * @param {V} description The description to be added to the OAuthFlow object.
   * @returns {OAuthFlow<T & { scopes: T['scopes'] & { [P in U]: V } }>}
   */
  $scope<U extends string, V extends string> (name: U, description: V): OAuthFlow<T & { scopes: T['scopes'] & { [P in U]: V } }> {
    const json = this.json()
    const scopes = { ...(json.scopes ?? []), [name]: description } as T['scopes'] & { [P in U]: V }
    return new OAuthFlow({ ...json, scopes })
  }
}
