import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import { ExternalDocumentationObjectType, isExternalDocumentationObject } from './schema'

export class ExternalDocumentation<T extends ExternalDocumentationObjectType> extends Base implements ExternalDocumentationObjectType {
  url!: T['url']
  description?: string

  constructor (data: T) {
    super()
    Object.assign(this, data)
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

  $description (description: string): ExternalDocumentation<T> {
    return new ExternalDocumentation({ ...this.json(), description })
  }
}
