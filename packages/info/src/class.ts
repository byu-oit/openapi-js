import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import { Contact, ContactObjectType } from '@byu-oit/openapi.contact'
import { License, LicenseObjectType } from '@byu-oit/openapi.license'
import { InfoObjectType, isInfoObject } from './schema'

export class Info<T extends InfoObjectType> extends Base implements InfoObjectType {
  title!: T['title']
  summary?: T['summary']
  description?: T['description']
  termsOfService?: T['termsOfService']
  contact?: T['contact']
  license?: T['license']
  version!: T['version']

  constructor (data: T)
  constructor (title: T['title'], version: T['version'], data?: Omit<T, 'title' | 'version'>)
  constructor (value: T['title'] | T, version?: T['version'], data?: Omit<T, 'title' | 'version'>) {
    super()
    const info = typeof value === 'string'
      ? {
          ...data,
          title: value,
          version
        }
      : value
    Object.assign(this, info)
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
    return new Info({ ...this.json(), contact: new Contact(data) })
  }

  $license<U extends LicenseObjectType> (data: U): Info<T & { license: U }> {
    return new Info({ ...this.json(), license: new License(data) })
  }

  $version<U extends string> (version: U): Info<T & { version: U }> {
    return new Info({ ...this.json(), version: version })
  }
}
