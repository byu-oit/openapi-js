import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { ExternalDocumentationObjectType, isExternalDocumentationObject } from './schema'

export class ExternalDocumentation<T extends ExternalDocumentationObjectType> extends BaseObject<T> {
  url: T['url']
  description?: T['description']

  constructor (data: T) {
    super()

    this.url = data.url

    if (data.description != null) {
      this.description = data.description
    }
  }

  static from<T extends ExternalDocumentationObjectType = ExternalDocumentationObjectType> (data: unknown): ExternalDocumentation<T> {
    const valid = ExternalDocumentation.validator.Check(data)
    if (!valid) throw new TypeCheckError(ExternalDocumentation.validator, data)
    return new ExternalDocumentation(data) as ExternalDocumentation<T>
  }

  static validator = isExternalDocumentationObject

  $url<U extends string>(url: U): ExternalDocumentation<T & { url: U }> {
    return new ExternalDocumentation({ ...this.json(), url })
  }

  $description<U extends string>(description: U): ExternalDocumentation<T & { description: U }> {
    return new ExternalDocumentation({ ...this.json(), description })
  }
}
