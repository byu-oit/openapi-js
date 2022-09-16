import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import { isLicenseObject, LicenseObjectType } from './schema'

export class License extends Base implements LicenseObjectType {
  name!: string
  identifier?: string
  url?: string

  constructor (data: LicenseObjectType)
  constructor (name: string, data?: Partial<LicenseObjectType>)
  constructor (name: string | LicenseObjectType, data?: Partial<LicenseObjectType>) {
    super()
    const license: LicenseObjectType = typeof name === 'string'
      ? { ...data, name }
      : name
    Object.assign(this, license)
  }

  static from (data: LicenseObjectType): License {
    const valid = License.validator.Check(data)
    if (!valid) throw new TypeCheckError(License.validator, data)
    return new License(data)
  }

  static validator = isLicenseObject

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
