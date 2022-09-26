import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Contact, ContactObjectType } from '@byu-oit/openapi.contact'
import { License, LicenseObjectType } from '@byu-oit/openapi.license'
import { InfoObjectType, isInfoObject } from './schema'

export class Info<T extends InfoObjectType> extends BaseObject<T> {
  title: T['title']
  summary?: T['summary']
  description?: T['description']
  termsOfService?: T['termsOfService']
  contact?: Contact<NonNullable<T['contact']>>
  license?: License<NonNullable<T['license']>>
  version: T['version']

  constructor (data: T) {
    super()

    this.title = data.title

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.termsOfService != null) {
      this.termsOfService = data.termsOfService
    }

    if (data.contact != null) {
      this.contact = new Contact(data.contact)
    }

    if (data.license != null) {
      this.license = new License(data.license)
    }

    this.version = data.version
  }

  static from<T extends InfoObjectType = InfoObjectType> (data: unknown): Info<T> {
    const valid = Info.validator.Check(data)
    if (!valid) throw new TypeCheckError(Info.validator, data)
    return new Info(data) as Info<T>
  }

  static validator = isInfoObject

  $title<U extends string> (title: U): Info<T & { title: U }> {
    return new Info({ ...this.json(), title: title })
  }

  $summary (text: string): Info<T> {
    return new Info({ ...this.json(), summary: text })
  }

  $description (text: string): Info<T> {
    return new Info({ ...this.json(), description: text })
  }

  $termsOfService (text: string): Info<T> {
    return new Info({ ...this.json(), termsOfService: text })
  }

  $contact<U extends ContactObjectType> (data: U): Info<T & { contact: U }> {
    return new Info({ ...this.json(), contact: data })
  }

  $license<U extends LicenseObjectType> (data: U): Info<T & { license: U }> {
    return new Info({ ...this.json(), license: data })
  }

  $version<U extends string> (version: U): Info<T & { version: U }> {
    return new Info({ ...this.json(), version: version })
  }
}
