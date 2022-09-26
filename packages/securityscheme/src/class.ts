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
  type: T['type']
  description?: T['description']
  name?: T['name']
  in?: T['in']
  scheme?: T['scheme']
  bearerFormat?: T['bearerFormat']
  flows?: OAuthFlowRecord<T['flows']>
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

  $flow<U extends OAuthGrantTypeType, V extends OAuthFlowObjectType> (type: U, data: V): SecurityScheme<T & { flows: T['flows'] & { [P in U]: V } }> {
    const json = this.json()
    const flows = { ...(json.flows ?? []), [type]: data } as T['flows'] & { [P in U]: V }
    return new SecurityScheme({ ...json, flows })
  }

  $openIdConnectUrl<U extends string> (openIdConnectUrl: U): SecurityScheme<T & { openIdConnectUrl: U }> {
    return new SecurityScheme({ ...this.json(), openIdConnectUrl })
  }
}
