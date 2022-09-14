import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class License extends Base implements S.License {
  name!: string
  identifier?: string
  url?: string

  constructor (data: S.License)
  constructor (name: string, data?: Partial<S.License>)
  constructor (name: string | S.License, data?: Partial<S.License>) {
    super()
    const license: S.License = typeof name === 'string'
      ? { ...data, name }
      : name
    Object.assign(this, license)
  }

  static from (data: S.License): License {
    const valid = License.validator.Check(data)
    if (!valid) throw new TypeCheckError(License.validator, data)
    return new License(data)
  }

  static validator = TypeCompiler.Compile(S.TLicense)

  $name (name: string): License {
    return new License({ ...this.json(), name })
  }

  $identifier (identifier: string): License {
    return new License({ ...this.json(), identifier })
  }

  $url (url: string): License {
    return new License({ ...this.json(), url })
  }
}
