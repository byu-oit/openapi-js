import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { ExternalDocumentationObjectType, isExternalDocumentationObject } from './schema'

/**
 * Allows referencing an external resource for extended documentation.
 * 
 * {@link https://spec.openapis.org/oas/latest.html#external-documentation-object}
 */
export class ExternalDocumentation<T extends ExternalDocumentationObjectType> extends BaseObject<T> {
  
  /**
   * A description of the target documentation. (CommonMark syntax)[https://spec.commonmark.org/] MAY be used for rich text representation.
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-8} 
  */
  url: T['url']

  /**
   * REQUIRED. The URL for the target documentation. This MUST be in the form of a URL.
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-8} 
  */
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

  /**
   * Creates a copy of the instance with the url added.
   * 
   * @template T, U
   * @param {U} url  The url to be added to the object.
   * @returns {ExternalDocumentation<T & { url: U }>}
   */
  $url<U extends string>(url: U): ExternalDocumentation<T & { url: U }> {
    return new ExternalDocumentation({ ...this.json(), url })
  }

  /**
   * Creates a copy of the instance with the url added.
   * 
   * @template T, U
   * @param {U} description The description to be added to the object.
   * @returns {ExternalDocumentation<T & { description: U }>}
   */
  $description<U extends string>(description: U): ExternalDocumentation<T & { description: U }> {
    return new ExternalDocumentation({ ...this.json(), description })
  }
}
