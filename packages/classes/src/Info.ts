import * as S from '@byu-oit/openapi-schemas'
import { Contact } from './Contact'
import { License } from './License'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class Info<T extends S.Info> extends Base implements S.Info {
  title!: T['title']
  summary?: string
  description?: string
  termsOfService?: string
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

  static from<T extends S.Info = S.Info> (data: unknown): Info<T> {
    const valid = Info.validator.Check(data)
    if (!valid) throw new TypeCheckError(Info.validator, data)
    return new Info(data) as Info<T>
  }

  static validator = TypeCompiler.Compile(S.TInfo)

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

  $contact<U extends S.Contact> (data: U): Info<T & { contact: U }> {
    return new Info({ ...this.json(), contact: new Contact(data) })
  }

  $license<U extends S.License> (data: U): Info<T & { license: U }> {
    return new Info({ ...this.json(), license: new License(data) })
  }

  $version<U extends string> (version: U): Info<T & { version: U }> {
    return new Info({ ...this.json(), version: version })
  }
}
