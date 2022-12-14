import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  OAuthFlow,
  OAuthFlowObjectType,
  OAuthGrantTypeType
} from '@byu-oit/openapi.oauthflow'
import {
  isSecuritySchemeObject,
  SecuritySchemeObjectType,
  SecuritySchemeType
} from './schema'
import { OAuthFlowRecord } from '@byu-oit/openapi.oauthflow/src/types'

export class SecurityScheme<T extends SecuritySchemeObjectType> extends BaseObject<T> {

  /**
   * REQUIRED. The type of the security scheme. Valid values are "apiKey", "http", "mutualTLS", "oauth2", "openIdConnect".
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  type: T['type']

  /**
   * A description for security scheme. CommonMark syntax MAY be used for rich text
   * representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  description?: T['description']

  /**
   *  REQUIRED. The name of the header, query or cookie parameter to be used.
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  name?: T['name']

  /**
   * REQUIRED. The location of the API key. Valid values are "query", "header" or
   * "cookie".
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  in?: T['in']

  /**
   * REQUIRED. The name of the HTTP Authorization scheme to be used in the
   * Authorization header as defined in [RFC7235]. The values used SHOULD be
   * registered in the IANA Authentication Scheme registry.
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  scheme?: T['scheme']

  /**
   * A hint to the client to identify how the bearer token is formatted. Bearer tokens
   * are usually generated by an authorization server, so this information is
   * primarily for documentation purposes.
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  bearerFormat?: T['bearerFormat']

  /**
   * REQUIRED. An object containing configuration information for the flow types supported.
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  flows?: OAuthFlowRecord<T['flows']>

  /**
   * REQUIRED. OpenId Connect URL to discover OAuth2 configuration values. This MUST
   * be in the form of a URL. The OpenID Connect standard requires the use of TLS.
   *
   * {@link https://spec.openapis.org/oas/latest.html#security-scheme-object
   * SecurityScheme Object}
   */
  openIdConnectUrl?: T['openIdConnectUrl']


  constructor (data: T) {
    super()

    this.type = data.type

    if (data.description != null) {
      this.description = data.description
    }

    if (data.name != null) {
      this.name = data.name
    }

    if (data.in != null) {
      this.in = data.in
    }

    if (data.scheme != null) {
      this.scheme = data.scheme
    }

    if (data.bearerFormat != null) {
      this.bearerFormat = data.bearerFormat
    }

    if (data.flows != null) {
      this.flows = Object.entries(data.flows).reduce((agg, [basename, data]) => {
        const flow = new OAuthFlow(data)
        return { ...agg, [basename]: flow }
      }, {} as OAuthFlowRecord<T['flows']>)
    }

    if (data.openIdConnectUrl != null) {
      this.openIdConnectUrl = data.openIdConnectUrl
    }
  }

  static from<T extends SecuritySchemeObjectType = SecuritySchemeObjectType> (data: unknown): SecurityScheme<T> {
    const valid = SecurityScheme.validator.Check(data)
    if (!valid) throw new TypeCheckError(SecurityScheme.validator, data)
    return new SecurityScheme(data) as SecurityScheme<T>
  }

  static validator = isSecuritySchemeObject

  /**
   * Creates a copy of the instance with the type added.
   *
   * @template T, U
   * @param {U} type
   * @returns {SecurityScheme<T & { type: U }>}
   */
  $type<U extends SecuritySchemeType> (type: U): SecurityScheme<T & { type: U }> {
    return new SecurityScheme({ ...this.json(), type })
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {SecurityScheme<T & { description: U }>}
   */
  $description<U extends string> (description: U): SecurityScheme<T & { description: U }> {
    return new SecurityScheme({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the name added.
   *
   * @template T, U
   * @param {U} name
   * @returns {SecurityScheme<T & { name: U }>}
   */
  $name<U extends string> (name: U): SecurityScheme<T & { name: U }> {
    return new SecurityScheme({ ...this.json(), name })
  }

  /**
   * Creates a copy of the instance with the in added.
   *
   * @template T, U
   * @param {U} location
   * @returns {SecurityScheme<T & { in: U }>}
   */
  $in<U extends string> (location: U): SecurityScheme<T & { in: U }> {
    return new SecurityScheme({ ...this.json(), in: location })
  }

  /**
   * Creates a copy of the instance with the scheme added.
   *
   * @template T, U
   * @param {U} scheme
   * @returns {SecurityScheme<T & { scheme: U }>}
   */
  $scheme<U extends string> (scheme: U): SecurityScheme<T & { scheme: U }> {
    return new SecurityScheme({ ...this.json(), scheme })
  }

  /**
   * Creates a copy of the instance with the bearerFormat added.
   *
   * @template T, U
   * @param {U} bearerFormat
   * @returns {SecurityScheme<T & { bearerFormat: U }>}
   */
  $bearerFormat<U extends string> (bearerFormat: U): SecurityScheme<T & { bearerFormat: U }> {
    return new SecurityScheme({ ...this.json(), bearerFormat })
  }

  /**
   * Creates a copy of the instance with the flow added.
   *
   * @template T, U, V, P
   * @param {U} type
   * @param {V} data
   * @returns {SecurityScheme<T & { flows: T['flows'] & { [P in U]: V } }>}
   */
  $flow<U extends OAuthGrantTypeType, V extends OAuthFlowObjectType> (type: U, data: V): SecurityScheme<T & { flows: T['flows'] & { [P in U]: V } }> {
    const json = this.json()
    const flows = { ...(json.flows ?? []), [type]: data } as T['flows'] & { [P in U]: V }
    return new SecurityScheme({ ...json, flows })
  }

  /**
   * Creates a copy of the instance with the openIdConnectUrl added.
   *
   * @template T, U
   * @param {U} openIdConnectUrl
   * @returns {SecurityScheme<T & { openIdConnectUrl: U }>}
   */
  $openIdConnectUrl<U extends string> (openIdConnectUrl: U): SecurityScheme<T & { openIdConnectUrl: U }> {
    return new SecurityScheme({ ...this.json(), openIdConnectUrl })
  }
}
