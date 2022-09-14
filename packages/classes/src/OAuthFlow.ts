import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class OAuthFlow<T extends S.OAuthFlow> extends Base implements S.OAuthFlow {
  authorizationUrl!: T['authorizationUrl']
  tokenUrl!: T['tokenUrl']
  refreshUrl?: T['refreshUrl']
  scopes!: T['scopes']

  constructor (data: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.OAuthFlow = S.OAuthFlow> (data: unknown): OAuthFlow<T> {
    const valid = OAuthFlow.validator.Check(data)
    if (!valid) throw new TypeCheckError(OAuthFlow.validator, data)
    return new OAuthFlow(data) as OAuthFlow<T>
  }

  static validator = TypeCompiler.Compile(S.TOAuthFlow)

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
