import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { isLicenseObject, LicenseObjectType } from './schema'

export class License<T extends LicenseObjectType> extends BaseObject<T> {
  name: T['name']
  identifier?: T['identifier']
  url?: T['url']

  constructor (data: T) {
    super()

    this.name = data.name

    if (data.identifier != null) {
      this.identifier = data.identifier
    }

    if (data.url != null) {
      this.url = data.url
    }
  }

  static from<T extends LicenseObjectType>(data: LicenseObjectType): License<T> {
    const valid = License.validator.Check(data)
    if (!valid) throw new TypeCheckError(License.validator, data)
    return new License(data) as License<T>
  }

  static validator = isLicenseObject

  $name<U extends string>(name: U): License<T & { name: U }> {
    return new License({ ...this.json(), name })
  }

  $identifier<U extends string>(identifier: U): License<T & { identifier: U }> {
    return new License({ ...this.json(), identifier })
  }

  $url<U extends string>(url: U): License<T & { url: U }> {
    return new License({ ...this.json(), url })
  }
}
