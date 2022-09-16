import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { OAuthFlow, OAuthFlowObjectType } from '@byu-oit/openapi.oauthflow'
import { OAuthGrantTypeType } from '@byu-oit/openapi.oauthflows'
import {
  isSecuritySchemeObject,
  SecuritySchemeObjectType,
  SecuritySchemeType
} from './schema'

export class SecurityScheme<T extends SecuritySchemeObjectType> extends Base implements SecuritySchemeObjectType {
  type!: T['type']
  description?: T['description']
  name!: T['name']
  in!: T['in']
  scheme!: T['scheme']
  bearerFormat!: T['bearerFormat']
  flows!: T['flows']
  openIdConnectUrl!: T['openIdConnectUrl']

  constructor (data: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends SecuritySchemeObjectType = SecuritySchemeObjectType> (data: unknown): SecurityScheme<T> {
    const valid = SecurityScheme.validator.Check(data)
    if (!valid) throw new TypeCheckError(SecurityScheme.validator, data)
    return new SecurityScheme(data) as SecurityScheme<T>
  }

  static validator = isSecuritySchemeObject

  $type<U extends SecuritySchemeType> (type: U): SecurityScheme<T & { type: U }> {
    return new SecurityScheme({ ...this.json(), type })
  }

  $description<U extends string> (description: U): SecurityScheme<T & { description: U }> {
    return new SecurityScheme({ ...this.json(), description })
  }

  $name<U extends string> (name: U): SecurityScheme<T & { name: U }> {
    return new SecurityScheme({ ...this.json(), name })
  }

  $in<U extends string> (location: U): SecurityScheme<T & { in: U }> {
    return new SecurityScheme({ ...this.json(), in: location })
  }

  $scheme<U extends string> (scheme: U): SecurityScheme<T & { scheme: U }> {
    return new SecurityScheme({ ...this.json(), scheme })
  }

  $bearerFormat<U extends string> (bearerFormat: U): SecurityScheme<T & { bearerFormat: U }> {
    return new SecurityScheme({ ...this.json(), bearerFormat })
  }

  $flow<U extends OAuthGrantTypeType, V extends OAuthFlowObjectType> (type: U, data: V): SecurityScheme<T & { flows: Merge<T['flows'], { [P in U]: OAuthFlow<V> }> }> {
    const flows = { ...this.flows, [type]: new OAuthFlow(data) }
    return new SecurityScheme({ ...this.json(), flows })
  }

  $openIdConnectUrl<U extends string> (openIdConnectUrl: U): SecurityScheme<T & { openIdConnectUrl: U }> {
    return new SecurityScheme({ ...this.json(), openIdConnectUrl })
  }
}
