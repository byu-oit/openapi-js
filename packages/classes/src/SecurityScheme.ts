import * as S from '@byu-oit/openapi-schemas'
import { OAuthFlow } from './OAuthFlow'
import { Base } from './Base'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class SecurityScheme<T extends S.SecurityScheme> extends Base implements S.SecurityScheme {
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

  static from<T extends S.SecurityScheme = S.SecurityScheme>(data: unknown): SecurityScheme<T> {
    const valid = SecurityScheme.validator.Check(data)
    if (!valid) throw new TypeCheckError(SecurityScheme.validator, data)
    return new SecurityScheme(data) as SecurityScheme<T>
  }

  static validator = TypeCompiler.Compile(S.TSecurityScheme)

  $type<U extends S.SecuritySchemeType> (type: U): SecurityScheme<T & { type: U }> {
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

  $flow<U extends S.OAuthFlowType, V extends S.OAuthFlow> (type: U, data: V): SecurityScheme<T & { flows: Merge<T['flows'], { [P in U]: OAuthFlow<V> }>}> {
    const flows = { ...this.flows, [type]: new OAuthFlow(data) }
    return new SecurityScheme({ ...this.json(), flows })
  }

  $openIdConnectUrl<U extends string> (openIdConnectUrl: U): SecurityScheme<T & { openIdConnectUrl: U }> {
    return new SecurityScheme({ ...this.json(), openIdConnectUrl })
  }
}
